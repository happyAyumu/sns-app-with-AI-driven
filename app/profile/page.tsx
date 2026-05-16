import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "プロフィール | X Clone",
  description: "ユーザープロフィール",
};

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerk_id: userId },
    select: { username: true },
  });

  if (!dbUser) {
    redirect("/sign-in");
  }

  redirect(`/users/${dbUser.username}`);
}
