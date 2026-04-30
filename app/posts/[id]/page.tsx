import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import LeftSidebar from "../../../components/layout/left-sidebar";
import { MobileBottomNav } from "../../../components/layout/mobile-bottom-nav";
import { PostDetailContent } from "../../../components/post-detail/post-detail-content";
import RightSidebar from "../../../components/layout/right-sidebar";
import { fetchPostDetailById } from "../../../lib/dal/social";
import {
  formatPostDate,
  formatPostDetailTimestamp,
  formatPostViews,
} from "../../../lib/formatters/post";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Post ${id} | X Clone`,
    description: "投稿詳細ページ",
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const detail = await fetchPostDetailById(id);

  if (!detail) notFound();

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white text-neutral-900">
      <div className="mx-auto flex min-h-0 w-full max-w-[1265px] flex-1 justify-center">
        <LeftSidebar />
        <main className="relative flex min-h-0 w-full max-w-[600px] flex-1 flex-col overflow-hidden border-x border-[#eff3f4] max-sm:border-x-0">
          <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[#eff3f4] px-3 py-2">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/[0.06]"
                aria-label="戻る"
              >
                <IoArrowBack className="h-5 w-5" />
              </Link>
              <h1 className="text-[20px] font-bold">Post</h1>
            </div>
            <PostDetailContent
              post={detail.post}
              replies={detail.replies}
              formatDate={formatPostDate}
              formatDetailTimestamp={formatPostDetailTimestamp}
              formatViews={formatPostViews}
            />
          </section>
        </main>
        <RightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
