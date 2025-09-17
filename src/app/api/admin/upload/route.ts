import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const category = formData.get("category") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (
    !category ||
    !["healthcare", "education", "government", "private"].includes(category)
  ) {
    return NextResponse.json(
      { error: "Valid category required" },
      { status: 400 }
    );
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

    await prisma.$connect();

    // Get the current highest order for this category
    const maxOrder = await prisma.projectImage.aggregate({
      where: { category },
      _max: { order: true },
    });
    const newOrder = (maxOrder._max.order || -1) + 1;

    const image = await prisma.projectImage.create({
      data: {
        src: uploadRes.secure_url,
        alt: uploadRes.original_filename,
        category,
        publicId: uploadRes.public_id,
        order: newOrder,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(image);
  } catch (err) {
    console.error("Upload failed:", err);
    await prisma.$disconnect();
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
