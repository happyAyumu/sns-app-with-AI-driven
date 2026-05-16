"use server";



import { auth } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";



function parseUsername(value: FormDataEntryValue | null): string | null {

  if (typeof value !== "string") return null;

  const username = value.trim();

  if (!username) return null;

  return username;

}



export async function toggleFollow(formData: FormData): Promise<void> {

  const targetUsername = parseUsername(formData.get("target_username"));

  if (!targetUsername) return;



  const { userId } = await auth();

  if (!userId) return;



  const [viewer, target] = await Promise.all([

    prisma.user.findUnique({

      where: { clerk_id: userId },

      select: { id: true, username: true },

    }),

    prisma.user.findUnique({

      where: { username: targetUsername },

      select: { id: true, username: true },

    }),

  ]);

  if (!viewer || !target) return;

  if (viewer.id === target.id) return;



  const existing = await prisma.follow.findUnique({

    where: {

      follower_id_following_id: {

        follower_id: viewer.id,

        following_id: target.id,

      },

    },

    select: { id: true },

  });



  try {

    if (existing) {

      await prisma.follow.delete({

        where: { id: existing.id },

      });

    } else {

      await prisma.follow.create({

        data: {

          follower_id: viewer.id,

          following_id: target.id,

        },

      });

    }

  } catch (error) {

    console.error("[toggleFollow]", error);

    return;

  }



  revalidatePath("/");

  revalidatePath("/explore");

  revalidatePath(`/users/${target.username}`);
  revalidatePath(`/users/${target.username}/following`);

  if (viewer.username) {
    revalidatePath(`/users/${viewer.username}`);
    revalidatePath(`/users/${viewer.username}/following`);
  }

}


