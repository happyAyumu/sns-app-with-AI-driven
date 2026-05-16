import "server-only";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export interface AuthorizedProfileEditor {
  dbUserId: string;
  username: string;
}

export type AuthorizeProfileEditResult =
  | { ok: true; editor: AuthorizedProfileEditor }
  | { ok: false; message: string };

export async function authorizeProfileEdit(username: string): Promise<AuthorizeProfileEditResult> {
  if (!username.trim()) {
    return { ok: false, message: "ユーザー名が不正です" };
  }

  const { userId } = await auth();
  if (!userId) {
    return { ok: false, message: "ログインが必要です" };
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerk_id: userId },
    select: { id: true, username: true },
  });

  if (!dbUser) {
    return { ok: false, message: "ユーザーが見つかりません" };
  }

  if (dbUser.username !== username) {
    return { ok: false, message: "他のユーザーのプロフィールは編集できません" };
  }

  return {
    ok: true,
    editor: { dbUserId: dbUser.id, username: dbUser.username },
  };
}
