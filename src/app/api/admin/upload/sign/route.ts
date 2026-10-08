import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UPLOAD_FOLDER } from "@/lib/uploads";

// Returns a short-lived signature so the browser can upload straight to
// Cloudinary. This keeps large photos off our server (Vercel caps request
// bodies at ~4.5 MB). Protected by middleware like every /api/admin route.
export async function POST() {
  const timestamp = Math.round(Date.now() / 1000);

  // Every param sent to Cloudinary (except file/api_key) must be signed.
  // format: "jpg" converts HEIC and other formats so all browsers can show them.
  const params = { folder: UPLOAD_FOLDER, format: "jpg", timestamp };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    ...params,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  });
}
