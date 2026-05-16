import type { NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import {
  ClerkUserHasNoEmailError,
  ClerkUserPrimaryEmailNotVerifiedError,
  deleteUserByClerkId,
  upsertUserFromClerkJson,
  upsertUserFromClerkSessionPayload,
} from "@/lib/clerk-user-sync";

export const runtime = "nodejs";

/**
 * Clerk → Supabase（`DATABASE_URL` の Postgres / Prisma `users` テーブル）同期。
 *
 * - **保存（INSERT/UPDATE）**: プライマリメールが Clerk 上で `verified` のユーザーのみ upsert。
 *   `user.created` / `user.updated` / `session.created`（サインイン時の補完）
 * - **削除**: `user.deleted` で `clerk_id` 一致行を削除
 *
 * ダッシュボードで `user.created`, `user.updated`, `user.deleted` を購読し、
 * メール検証後に DB へ載せるなら `user.updated` も必須。
 */
export async function POST(req: NextRequest) {
  let evt: Awaited<ReturnType<typeof verifyWebhook>>;
  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("[clerk webhook] verifyWebhook failed", err);
    return new Response("Invalid webhook signature or payload", { status: 400 });
  }

  try {
    if (evt.type === "user.created" || evt.type === "user.updated") {
      try {
        await upsertUserFromClerkJson(evt.data);
      } catch (err) {
        if (err instanceof ClerkUserHasNoEmailError) {
          const webhookHadNoEmails = (evt.data.email_addresses?.length ?? 0) === 0;
          console.warn("[clerk webhook] skipped sync (no resolvable email)", {
            type: evt.type,
            clerkUserId: err.clerkUserId,
            webhookHadNoEmails,
          });
          return Response.json({
            ok: true,
            skipped: "email_not_ready",
            ...(webhookHadNoEmails
              ? {
                  hint:
                    "このペイロードは Clerk のドキュメント付きサンプルと同型で、email_addresses が空のままです。ダッシュボードの「Send example」では同期できません。アプリから新規登録して本物の user.created を送るか、既存イベントの Replay を使ってください。",
                }
              : {}),
          });
        }
        if (err instanceof ClerkUserPrimaryEmailNotVerifiedError) {
          console.warn("[clerk webhook] skipped sync (primary email not verified yet)", {
            type: evt.type,
            clerkUserId: err.clerkUserId,
          });
          return Response.json({
            ok: true,
            skipped: "primary_email_not_verified",
            hint: "メール検証が終わると user.updated が届き、そのタイミングで Supabase users に反映されます。",
          });
        }
        throw err;
      }
    } else if (evt.type === "session.created") {
      try {
        await upsertUserFromClerkSessionPayload(evt.data);
      } catch (err) {
        if (err instanceof ClerkUserHasNoEmailError) {
          console.warn("[clerk webhook] skipped session sync (no resolvable email)", {
            type: evt.type,
            clerkUserId: err.clerkUserId,
          });
          return Response.json({ ok: true, skipped: "email_not_ready" });
        }
        if (err instanceof ClerkUserPrimaryEmailNotVerifiedError) {
          console.warn("[clerk webhook] skipped session sync (primary email not verified)", {
            type: evt.type,
            clerkUserId: err.clerkUserId,
          });
          return Response.json({ ok: true, skipped: "primary_email_not_verified" });
        }
        throw err;
      }
    } else if (evt.type === "user.deleted") {
      const clerkUserId = evt.data.id;
      if (clerkUserId) await deleteUserByClerkId(clerkUserId);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[clerk webhook] handler failed", err);
    const detail =
      process.env.NODE_ENV === "development" && err instanceof Error ? err.message : undefined;
    return Response.json(
      { ok: false, error: "handler_failed", detail },
      { status: 500 },
    );
  }
}
