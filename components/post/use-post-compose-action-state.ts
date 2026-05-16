"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { createPost } from "@/lib/actions/create-post";
import {
  getPostComposeErrorMessage,
  postComposeInitialState,
} from "@/lib/actions/post-compose-state";

export function usePostComposeActionState() {
  const router = useRouter();
  const [state, formAction] = useActionState(createPost, postComposeInitialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.status !== "success") return;
    const el = textareaRef.current;
    if (el) el.value = "";
    router.refresh();
  }, [state, router]);

  return {
    state,
    formAction,
    errorMessage: getPostComposeErrorMessage(state),
    textareaRef,
  };
}
