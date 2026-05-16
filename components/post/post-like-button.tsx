"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { useOptimistic, useTransition } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { toggleLike } from "@/lib/actions/toggle-like";

type LikeDisplayState = { liked: boolean; count: number };

function LikeIconAndCount({
  liked,
  count,
  iconClass,
  pending,
}: {
  liked: boolean;
  count: number;
  iconClass: string;
  pending: boolean;
}) {
  return (
    <>
      <span
        className={`rounded-full p-2 group-hover:bg-pink-500/10 ${pending ? "opacity-60" : ""}`}
        aria-hidden
      >
        {liked ? (
          <IoHeart className={`${iconClass} text-pink-600`} />
        ) : (
          <IoHeartOutline className={iconClass} />
        )}
      </span>
      <span className={liked ? "font-medium text-red-600" : ""}>{count}</span>
    </>
  );
}

type Variant = "timeline" | "detail";

const variantStyles: Record<Variant, { wrapper: string; icon: string }> = {
  timeline: {
    wrapper: "group flex items-center gap-1 text-[13px] transition-colors hover:text-pink-600",
    icon: "h-[18px] w-[18px]",
  },
  detail: {
    wrapper: "group flex items-center gap-1.5 text-[14px] transition-colors hover:text-pink-600",
    icon: "h-[20px] w-[20px]",
  },
};

interface PostLikeButtonProps {
  postId: string;
  likesCount: number;
  likedByMe: boolean;
  /** `/posts/[id]` を開いているとき、そのページの `id`（リバリデート用） */
  detailPostId?: string;
  variant?: Variant;
}

export function PostLikeButton({
  postId,
  likesCount,
  likedByMe,
  detailPostId,
  variant = "timeline",
}: PostLikeButtonProps) {
  const { isLoaded, userId } = useAuth();
  const vs = variantStyles[variant];

  const [optimistic, addOptimistic] = useOptimistic<LikeDisplayState, void>(
    { liked: likedByMe, count: likesCount },
    (current) => ({
      liked: !current.liked,
      count: current.liked ? Math.max(0, current.count - 1) : current.count + 1,
    }),
  );

  const [isPending, startTransition] = useTransition();

  if (!isLoaded) {
    return (
      <span className={`${vs.wrapper} cursor-wait opacity-60 text-[#536471]`}>
        <span className={`rounded-full p-2 ${vs.icon}`}>
          <IoHeartOutline className={vs.icon} />
        </span>
        {likesCount}
      </span>
    );
  }

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <button type="button" className={`${vs.wrapper} text-[#536471]`} aria-label="いいねするにはログイン">
          <span className="rounded-full p-2 group-hover:bg-pink-500/10">
            <IoHeartOutline className={vs.icon} />
          </span>
          {likesCount}
        </button>
      </SignInButton>
    );
  }

  const handleToggle = () => {
    startTransition(async () => {
      addOptimistic(undefined);
      const fd = new FormData();
      fd.set("post_id", postId);
      if (detailPostId) {
        fd.set("detail_post_id", detailPostId);
      }
      await toggleLike(fd);
    });
  };

  const { liked, count } = optimistic;

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleToggle}
      className={`${vs.wrapper} disabled:opacity-70 ${liked ? "" : "text-[#536471]"}`}
      aria-label={liked ? "いいねを取り消す" : "いいねする"}
      aria-pressed={liked}
    >
      <LikeIconAndCount liked={liked} count={count} iconClass={vs.icon} pending={isPending} />
    </button>
  );
}
