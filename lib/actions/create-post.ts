"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PostComposeState } from "./post-compose-state";
import { parseCreatePostContent, parseOptionalReplyToId } from "@/lib/post/parse-create-post-form";

export async function createPost(
  _prevState: PostComposeState,
  formData: FormData,
): Promise<PostComposeState> {
  const { userId } = await auth();
  if (!userId) {
    return { status: "error", message: "ログインが必要です" };
  }

  const contentParsed = parseCreatePostContent(formData);
  if (!contentParsed.ok) {
    return { status: "error", message: contentParsed.message };
  }

  const replyParsed = parseOptionalReplyToId(formData);
  if (!replyParsed.ok) {
    return { status: "error", message: replyParsed.message };
  }

  const { content } = contentParsed;
  const { replyToId } = replyParsed;

  const user = await prisma.user.findUnique({ where: { clerk_id: userId } });
  if (!user) {
    return {
      status: "error",
      message: "アカウントがまだ同期されていません。しばらく待ってから再度お試しください。",
    };
  }

  let parentAuthorUsername: string | null = null;
  if (replyToId) {
    const parent = await prisma.post.findUnique({
      where: { id: replyToId },
      select: { user: { select: { username: true } } },
    });
    if (!parent) {
      return { status: "error", message: "返信先の投稿が見つかりません" };
    }
    parentAuthorUsername = parent.user.username;
  }

  try {
    await prisma.post.create({
      data: {
        user_id: user.id,
        content,
        reply_to_id: replyToId,
      },
    });
  } catch (err) {
    console.error("[createPost]", err);
    return { status: "error", message: "投稿に失敗しました" };
  }

  revalidatePath("/");
  revalidatePath(`/users/${user.username}`);
  if (replyToId) {
    revalidatePath(`/posts/${replyToId}`);
    if (parentAuthorUsername) {
      revalidatePath(`/users/${parentAuthorUsername}`);
    }
  }

  return { status: "success" };
}
