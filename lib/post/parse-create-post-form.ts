import { isValidPgUuid } from "@/lib/uuid";

export const CREATE_POST_MAX_LENGTH = 280;
export type ParseCreatePostContentResult =
  | { ok: true; content: string }
  | { ok: false; message: string };

export function parseCreatePostContent(formData: FormData): ParseCreatePostContentResult {
  const raw = formData.get("content");
  if (typeof raw !== "string") {
    return { ok: false, message: "不正な入力です" };
  }

  const content = raw.trim();
  if (content.length === 0) {
    return { ok: false, message: "投稿内容を入力してください" };
  }
  if (content.length > CREATE_POST_MAX_LENGTH) {
    return { ok: false, message: `${CREATE_POST_MAX_LENGTH}文字以内で入力してください` };
  }

  return { ok: true, content };
}

export type ParseReplyToIdResult =
  | { ok: true; replyToId: string | null }
  | { ok: false; message: string };

/** 任意の `reply_to_id`（hidden）。空なら通常投稿。 */
export function parseOptionalReplyToId(formData: FormData): ParseReplyToIdResult {
  const raw = formData.get("reply_to_id");
  if (raw == null || raw === "") {
    return { ok: true, replyToId: null };
  }
  if (typeof raw !== "string") {
    return { ok: false, message: "不正な入力です" };
  }
  const id = raw.trim();
  if (id.length === 0) {
    return { ok: true, replyToId: null };
  }
  if (!isValidPgUuid(id)) {
    return { ok: false, message: "不正な返信先です" };
  }
  return { ok: true, replyToId: id };
}

