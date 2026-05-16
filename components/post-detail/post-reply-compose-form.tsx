"use client";

import { ComposePostSubmitButton } from "@/components/post/compose-post-submit-button";
import { usePostComposeActionState } from "@/components/post/use-post-compose-action-state";

interface PostReplyComposeFormProps {
  parentPostId: string;
  replyToHandle: string;
}

export function PostReplyComposeForm({ parentPostId, replyToHandle }: PostReplyComposeFormProps) {
  const { formAction, errorMessage, textareaRef } = usePostComposeActionState();

  return (
    <form id="reply-compose" action={formAction} className="min-w-0 flex-1">
      <input type="hidden" name="reply_to_id" value={parentPostId} />
      <p className="mb-2 text-[13px] text-[#536471]">
        返信先: <span className="font-medium text-neutral-900">@{replyToHandle}</span>
      </p>
      <label htmlFor={`reply-compose-${parentPostId}`} className="sr-only">
        Post your reply
      </label>
      <textarea
        ref={textareaRef}
        id={`reply-compose-${parentPostId}`}
        name="content"
        rows={2}
        placeholder="Post your reply"
        maxLength={280}
        className="w-full resize-none border-0 bg-transparent text-[20px] text-neutral-900 placeholder:text-[#536471] focus:outline-none focus:ring-0"
      />
      {errorMessage ? (
        <p className="mt-1 text-[13px] text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <div className="mt-3 flex items-center justify-end border-t border-[#eff3f4] pt-3">
        <ComposePostSubmitButton submitLabel="Reply" />
      </div>
    </form>
  );
}
