import "server-only";

import type { EmailAddressJSON, UserJSON, WebhookEvent } from "@clerk/backend";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

const CLERK_PASSWORD_PLACEHOLDER = "__clerk_managed__";

/** Session webhook payload (union extract needs all session.* event types). */
type ClerkSessionWebhookPayload = Extract<
  WebhookEvent,
  { type: "session.created" | "session.ended" | "session.removed" | "session.revoked" }
>["data"];

/** Webhook payload has no resolvable email yet. */
export class ClerkUserHasNoEmailError extends Error {
  constructor(public readonly clerkUserId: string) {
    super(`Clerk user ${clerkUserId} has no email address`);
    this.name = "ClerkUserHasNoEmailError";
  }
}

/** Primary email not verified; expect a later user.updated. */
export class ClerkUserPrimaryEmailNotVerifiedError extends Error {
  constructor(public readonly clerkUserId: string) {
    super(`Clerk user ${clerkUserId} primary email is not verified yet`);
    this.name = "ClerkUserPrimaryEmailNotVerifiedError";
  }
}

function sanitizeUsername(raw: string): string {
  const s = raw
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
  return s.slice(0, 30) || "user";
}

function getPrimaryEmailRecord(user: UserJSON): EmailAddressJSON | null {
  const addresses = user.email_addresses ?? [];
  if (user.primary_email_address_id) {
    const primary = addresses.find((e: EmailAddressJSON) => e.id === user.primary_email_address_id);
    if (primary?.email_address) return primary;
  }
  const first = addresses[0];
  return first?.email_address ? first : null;
}

function getPrimaryEmail(user: UserJSON): string | null {
  return getPrimaryEmailRecord(user)?.email_address ?? null;
}

/** Sync to DB only when primary email verification.status is verified (or null for OAuth). */
function isPrimaryEmailVerifiedForDb(user: UserJSON): boolean {
  const primary = getPrimaryEmailRecord(user);
  if (!primary?.email_address) return false;
  const v = primary.verification;
  if (v == null) return true;
  return v.status === "verified";
}

/** Refetch user from Clerk API when webhook email_addresses is empty. */
async function resolveUserJsonWithEmail(user: UserJSON): Promise<UserJSON> {
  if (getPrimaryEmail(user) !== null) return user;
  if (!user.id) return user;
  try {
    const client = await clerkClient();
    const full = await client.users.getUser(user.id);
    if (full.raw && getPrimaryEmail(full.raw) !== null) return full.raw;
  } catch (err) {
    console.warn("[clerk-user-sync] users.getUser failed (email still missing on webhook payload)", {
      clerkId: user.id,
      err,
    });
  }
  return user;
}

function buildDisplayName(user: UserJSON, fallbackUsername: string): string {
  const parts = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  if (parts) return parts.slice(0, 120);
  if (user.username) return user.username.slice(0, 120);
  return fallbackUsername.slice(0, 120);
}

async function isUsernameTaken(username: string, excludeUserId?: string): Promise<boolean> {
  const row = await prisma.user.findUnique({ where: { username } });
  if (!row) return false;
  if (excludeUserId && row.id === excludeUserId) return false;
  return true;
}

async function ensureUniqueUsername(base: string, excludeUserId?: string): Promise<string> {
  let candidate = sanitizeUsername(base).slice(0, 30) || "user";
  if (!(await isUsernameTaken(candidate, excludeUserId))) return candidate;
  for (let i = 0; i < 12; i++) {
    const suffix = Math.random().toString(36).slice(2, 8);
    candidate = `${sanitizeUsername(base).slice(0, 22) || "user"}_${suffix}`;
    if (!(await isUsernameTaken(candidate, excludeUserId))) return candidate;
  }
  throw new Error("Could not allocate unique username for Clerk user");
}

export async function upsertUserFromClerkJson(user: UserJSON): Promise<void> {
  const resolved = await resolveUserJsonWithEmail(user);
  const clerkId = resolved.id;
  const email = getPrimaryEmail(resolved);
  if (!email) {
    throw new ClerkUserHasNoEmailError(clerkId);
  }
  if (!isPrimaryEmailVerifiedForDb(resolved)) {
    throw new ClerkUserPrimaryEmailNotVerifiedError(clerkId);
  }

  const existing = await prisma.user.findUnique({ where: { clerk_id: clerkId } });
  const usernameBase = resolved.username ?? email.split("@")[0] ?? "user";
  const username = await ensureUniqueUsername(usernameBase, existing?.id);
  const displayName = buildDisplayName(resolved, username);
  const avatarUrl = resolved.has_image ? resolved.image_url : null;

  await prisma.user.upsert({
    where: { clerk_id: clerkId },
    create: {
      email,
      username,
      display_name: displayName,
      password_hash: CLERK_PASSWORD_PLACEHOLDER,
      clerk_id: clerkId,
      avatar_url: avatarUrl,
    },
    update: {
      email,
      username,
      display_name: displayName,
      avatar_url: avatarUrl,
    },
  });
}

export async function deleteUserByClerkId(clerkId: string): Promise<void> {
  await prisma.user.deleteMany({ where: { clerk_id: clerkId } });
}

/** session.created: upsert from embedded user or fetch by user_id. */
export async function upsertUserFromClerkSessionPayload(data: ClerkSessionWebhookPayload): Promise<void> {
  if (data.user) {
    await upsertUserFromClerkJson(data.user);
    return;
  }
  if (!data.user_id) return;
  const client = await clerkClient();
  const full = await client.users.getUser(data.user_id);
  if (full.raw) await upsertUserFromClerkJson(full.raw);
}
