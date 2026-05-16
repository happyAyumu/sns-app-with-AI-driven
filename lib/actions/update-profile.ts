"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authorizeProfileEdit } from "@/lib/profile/authorize-profile-edit";
import {
  createSupabaseAdminClient,
  getProfileImageUploadErrorMessage,
  isSupabaseStorageConfigured,
  ProfileImageUploadError,
  ProfileImageValidationError,
  uploadProfileImage,
} from "@/lib/supabase-storage";
import type { UpdateProfileState } from "./update-profile-state";

function parseDisplayName(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > 50) return null;
  return trimmed;
}

function parseBio(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.slice(0, 160);
}

function getImageFile(formData: FormData, field: string): File | null {
  const value = formData.get(field);
  if (!(value instanceof File) || value.size === 0) return null;
  return value;
}

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const rawUsername = formData.get("username");
  const rawDisplayName = formData.get("display_name");
  const rawBio = formData.get("bio");

  if (typeof rawUsername !== "string" || !rawUsername.trim()) {
    return { status: "error", message: "ユーザー名が不正です" };
  }
  const username = rawUsername.trim();

  const displayName = parseDisplayName(rawDisplayName);
  if (!displayName) {
    return { status: "error", message: "表示名は1〜50文字で入力してください" };
  }
  const bio = parseBio(rawBio);

  const authResult = await authorizeProfileEdit(username);
  if (!authResult.ok) {
    return { status: "error", message: authResult.message };
  }

  const avatarFile = getImageFile(formData, "avatar");
  const headerFile = getImageFile(formData, "header");
  const needsUpload = Boolean(avatarFile || headerFile);

  if (needsUpload && !isSupabaseStorageConfigured()) {
    return {
      status: "error",
      message: "画像アップロードの設定が完了していません（SUPABASE_SERVICE_ROLE_KEY を確認してください）",
    };
  }

  let avatarUrl: string | undefined;
  let headerUrl: string | undefined;

  if (needsUpload) {
    const storageClient = createSupabaseAdminClient();
    if (!storageClient) {
      return { status: "error", message: "ストレージに接続できません" };
    }

    const { dbUserId } = authResult.editor;

    try {
      if (avatarFile) {
        avatarUrl = await uploadProfileImage(storageClient, dbUserId, avatarFile, "avatar");
      }
      if (headerFile) {
        headerUrl = await uploadProfileImage(storageClient, dbUserId, headerFile, "header");
      }
    } catch (error) {
      if (error instanceof ProfileImageValidationError) {
        return { status: "error", message: error.message };
      }
      if (error instanceof ProfileImageUploadError) {
        return { status: "error", message: getProfileImageUploadErrorMessage(error) };
      }
      console.error("[updateProfile] upload", error);
      return { status: "error", message: "画像のアップロードに失敗しました" };
    }
  }

  try {
    await prisma.user.update({
      where: { id: authResult.editor.dbUserId },
      data: {
        display_name: displayName,
        bio: bio || null,
        ...(avatarUrl !== undefined ? { avatar_url: avatarUrl } : {}),
        ...(headerUrl !== undefined ? { header_url: headerUrl } : {}),
      },
    });
  } catch (error) {
    console.error("[updateProfile]", error);
    return { status: "error", message: "プロフィール更新に失敗しました" };
  }

  revalidatePath(`/users/${username}`);
  revalidatePath(`/users/${username}/edit`);

  return { status: "success" };
}
