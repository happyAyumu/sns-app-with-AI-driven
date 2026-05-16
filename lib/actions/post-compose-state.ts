export type PostComposeState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export const postComposeInitialState: PostComposeState = { status: "idle" };

export function getPostComposeErrorMessage(state: PostComposeState): string | null {
  if (state.status === "error") return state.message;
  return null;
}
