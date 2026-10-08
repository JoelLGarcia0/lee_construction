// Shared between the admin upload UI and the upload API routes.

export const UPLOAD_FOLDER = "lee-construction-projects";

// Cloudinary free plan limit for a single image.
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const CATEGORIES = ["healthcare", "education", "government", "private"];

// Some browsers (notably Chrome on Windows) leave file.type empty for HEIC,
// so fall back to checking the extension.
export function isImageFile(file: File) {
  return file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name);
}
