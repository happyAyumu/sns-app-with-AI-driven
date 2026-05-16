"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isValidPgUuid } from "@/lib/uuid";

export async function toggleLike(formData: FormData): Promise<void> {
  const rawPostId = formData.get("post_id");
  if (typeof rawPostId !== "string" || !isValidPgUuid(rawPostId)) {
    return;
  }
  const postId = rawPostId.trim();

  const { userId } = await auth();
  if (!userId) return;

  const dbUser = await prisma.user.findUnique({
    where: { clerk_id: userId },
    select: { id: true },
  });
  if (!dbUser) return;

  const postExists = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true },
  });
  if (!postExists) return;

  const existing = await prisma.like.findFirst({
    where: { user_id: dbUser.id, post_id: postId },
    select: { id: true },
  });

  try {
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
    } else {
      await prisma.like.create({
        data: { user_id: dbUser.id, post_id: postId },
      });
    }
  } catch (err) {
    console.error("[toggleLike]", err);
    return;
  }

  revalidatePath("/");

  const rawDetailId = formData.get("detail_post_id");
  if (typeof rawDetailId === "string" && isValidPgUuid(rawDetailId)) {
    revalidatePath(`/posts/${rawDetailId.trim()}`);
  }
}
