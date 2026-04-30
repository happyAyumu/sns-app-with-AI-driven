/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user1Id = "00000000-0000-0000-0000-000000000001";
  const user2Id = "00000000-0000-0000-0000-000000000002";
  const user3Id = "00000000-0000-0000-0000-000000000003";
  const post1Id = "10000000-0000-0000-0000-000000000001";
  const post2Id = "10000000-0000-0000-0000-000000000002";
  const post3Id = "10000000-0000-0000-0000-000000000003";

  // Seed re-runを考慮して、順序通りに全削除してから投入する
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      id: user1Id,
      email: "tanaka@example.com",
      password_hash: "demo_hashed_password_tanaka",
      username: "user_1",
      display_name: "田中 太郎",
      bio: "Next.js と Prisma を学習中です。",
      avatar_url: "https://i.pravatar.cc/150?img=1",
      header_url: "https://picsum.photos/seed/tanaka/1200/400",
    },
  });

  const bob = await prisma.user.create({
    data: {
      id: user2Id,
      email: "sato@example.com",
      password_hash: "demo_hashed_password_sato",
      username: "user_2",
      display_name: "佐藤 花子",
      bio: "Supabase で API 開発をしています。",
      avatar_url: "https://i.pravatar.cc/150?img=2",
      header_url: "https://picsum.photos/seed/sato/1200/400",
    },
  });

  const charlie = await prisma.user.create({
    data: {
      id: user3Id,
      email: "suzuki@example.com",
      password_hash: "demo_hashed_password_suzuki",
      username: "user_3",
      display_name: "鈴木 一郎",
      bio: "UI/UX デザイン担当です。",
      avatar_url: "https://i.pravatar.cc/150?img=3",
      header_url: "https://picsum.photos/seed/suzuki/1200/400",
    },
  });

  const postAlice = await prisma.post.create({
    data: {
      id: post1Id,
      user_id: alice.id,
      content: "はじめての投稿です。よろしくお願いします！ #自己紹介",
    },
  });

  const postBob = await prisma.post.create({
    data: {
      id: post2Id,
      user_id: bob.id,
      content: "Prisma migrate が通ってうれしいです。",
    },
  });

  await prisma.post.create({
    data: {
      id: post3Id,
      user_id: charlie.id,
      content: "@user_1 ようこそ！一緒に開発がんばりましょう。",
      reply_to_id: postAlice.id,
    },
  });

  await prisma.like.createMany({
    data: [
      { user_id: bob.id, post_id: postAlice.id },
      { user_id: charlie.id, post_id: postAlice.id },
      { user_id: alice.id, post_id: postBob.id },
    ],
  });

  await prisma.follow.createMany({
    data: [
      { follower_id: alice.id, following_id: bob.id },
      { follower_id: bob.id, following_id: charlie.id },
      { follower_id: charlie.id, following_id: alice.id },
    ],
  });

  console.log("Seed completed: users=3, posts=3, likes=3, follows=3");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
