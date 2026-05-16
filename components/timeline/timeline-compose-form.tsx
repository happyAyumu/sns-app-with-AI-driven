"use client";

import {
  IoImageOutline,
  IoLocationOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { TbMoodSmile, TbCalendarTime } from "react-icons/tb";
import { ComposePostSubmitButton } from "../post/compose-post-submit-button";
import { usePostComposeActionState } from "../post/use-post-compose-action-state";

export function TimelineComposeForm() {
  const { formAction, errorMessage, textareaRef } = usePostComposeActionState();

  return (
    <form action={formAction} className="min-w-0 flex-1">
      <label htmlFor="home-compose" className="sr-only">
        What&apos;s happening?
      </label>
      <textarea
        ref={textareaRef}
        id="home-compose"
        name="content"
        rows={2}
        placeholder="What's happening?"
        maxLength={280}
        className="w-full resize-none border-0 bg-transparent text-[18px] text-neutral-900 placeholder:text-[#536471] focus:outline-none focus:ring-0 sm:text-[20px]"
      />
      {errorMessage ? (
        <p className="mt-1 text-[13px] text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <div className="mt-3 flex items-center justify-between border-t border-[#eff3f4] pt-3">
        <div className="flex items-center gap-0.5 text-[#1d9bf0]">
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
            aria-label="Add image"
          >
            <IoImageOutline className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
            aria-label="GIF"
          >
            <MdOutlineGifBox className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
            aria-label="Poll"
          >
            <IoStatsChartOutline className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
            aria-label="Emoji"
          >
            <TbMoodSmile className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
            aria-label="Schedule"
          >
            <TbCalendarTime className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
            aria-label="Location"
          >
            <IoLocationOutline className="h-5 w-5" />
          </button>
        </div>
        <ComposePostSubmitButton submitLabel="Post" />
      </div>
    </form>
  );
}
