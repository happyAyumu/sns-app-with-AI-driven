export type UpdateProfileState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export const updateProfileInitialState: UpdateProfileState = { status: "idle" };
