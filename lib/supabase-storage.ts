/**
 * Supabase Storage（プロフィール画像）
 *
 * ダッシュボードで public バケット `avatars` / `headers` を作成してください。
 * Server Action アップロードには SUPABASE_SERVICE_ROLE_KEY が必要です。
 */
import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const AVATARS_BUCKET = "avatars";
export const HEADERS_BUCKET = "headers";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const MAX_HEADER_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export type ProfileImageKind = "avatar" | "header";

export class ProfileImageValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileImageValidationError";
  }
}

export class ProfileImageUploadError extends Error {
  readonly bucket: string;

  constructor(supabaseMessage: string, bucket: string) {
    super(supabaseMessage);
    this.name = "ProfileImageUploadError";
    this.bucket = bucket;
  }
}

/** Supabase Storage API のエラーをユーザー向けメッセージに変換 */
export function getProfileImageUploadErrorMessage(error: ProfileImageUploadError): string {
  const msg = error.message.toLowerCase();
  if (msg.includes("bucket not found") || msg.includes("not found")) {
    return `Storage バケット「${error.bucket}」が見つかりません。Supabase ダッシュボードで public バケット「avatars」「headers」を作成してください。`;
  }
  if (msg.includes("invalid api key") || msg.includes("jwt")) {
    return "Supabase の API キーが無効です。SUPABASE_SERVICE_ROLE_KEY を確認してください。";
  }
  if (process.env.NODE_ENV === "development") {
    return `画像のアップロードに失敗しました（${error.bucket}）: ${error.message}`;
  }
  return "画像のアップロードに失敗しました";
}

function getSupabaseUrl(): string | null {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? null;
}

function getServiceRoleKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? null;
}

/** Server Action から Storage にアップロードする用（service role） */
export function createSupabaseAdminClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const serviceRoleKey = getServiceRoleKey();
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isSupabaseStorageConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getServiceRoleKey());
}

function bucketForKind(kind: ProfileImageKind): string {
  return kind === "avatar" ? AVATARS_BUCKET : HEADERS_BUCKET;
}

function maxBytesForKind(kind: ProfileImageKind): number {
  return kind === "avatar" ? MAX_AVATAR_BYTES : MAX_HEADER_BYTES;
}

function fileNameForKind(kind: ProfileImageKind, ext: string): string {
  return kind === "avatar" ? `avatar.${ext}` : `header.${ext}`;
}

export function validateProfileImageFile(file: File, kind: ProfileImageKind): void {
  if (!(file instanceof File) || file.size === 0) {
    throw new ProfileImageValidationError("画像ファイルを選択してください");
  }
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new ProfileImageValidationError("JPEG / PNG / WebP / GIF のみアップロードできます");
  }
  const maxBytes = maxBytesForKind(kind);
  if (file.size > maxBytes) {
    const mb = kind === "avatar" ? "2MB" : "5MB";
    throw new ProfileImageValidationError(`画像サイズは${mb}以下にしてください`);
  }
}

export function getPublicStorageUrl(bucket: string, objectPath: string): string | null {
  const url = getSupabaseUrl();
  if (!url) return null;
  const encodedPath = objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${url}/storage/v1/object/public/${bucket}/${encodedPath}`;
}

/**
 * `{userId}/avatar.{ext}` または `{userId}/header.{ext}` に upsert し、公開 URL を返す。
 */
export async function uploadProfileImage(
  client: SupabaseClient,
  userId: string,
  file: File,
  kind: ProfileImageKind,
): Promise<string> {
  validateProfileImageFile(file, kind);

  const ext = MIME_TO_EXT[file.type];
  if (!ext) {
    throw new ProfileImageValidationError("対応していない画像形式です");
  }

  const bucket = bucketForKind(kind);
  const objectPath = `${userId}/${fileNameForKind(kind, ext)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await client.storage.from(bucket).upload(objectPath, buffer, {
    contentType: file.type,
    upsert: true,
  });

  if (error) {
    console.error("[uploadProfileImage]", kind, bucket, error);
    throw new ProfileImageUploadError(error.message, bucket);
  }

  const publicUrl = getPublicStorageUrl(bucket, objectPath);
  if (!publicUrl) {
    throw new Error("画像 URL の生成に失敗しました");
  }

  return publicUrl;
}
