import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const uploadRes = await new Promise<{
      secure_url: string;
      original_filename: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "lee-construction-projects",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve({
                secure_url: result.secure_url,
                original_filename: result.original_filename,
                public_id: result.public_id,
              });
            } else {
              reject(new Error("No result returned from Cloudinary"));
            }
          }
        )
        .end(buffer);
    });

    const image = {
      id: Date.now().toString(),
      src: uploadRes.secure_url,
      alt: uploadRes.original_filename,
      publicId: uploadRes.public_id,
      order: 0,
    };

    const current = ((await redis.get("lee-images")) as ImageData[]) || [];
    image.order = current.length;
    const updated = [...current, image];
    await redis.set("lee-images", updated);

    return NextResponse.json(image);
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
