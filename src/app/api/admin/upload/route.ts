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
    const uploadRes = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "lee-construction-projects",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
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

    const current = ((await redis.get("lee-images")) as any[]) || [];
    image.order = current.length;
    const updated = [...current, image];
    await redis.set("lee-images", updated);

    return NextResponse.json(image);
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
