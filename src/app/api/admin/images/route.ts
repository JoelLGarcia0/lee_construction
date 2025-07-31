import { NextResponse } from "next/server";
import prisma from "@/lib/db";

type ProjectImageInput = {
  src: string;
  alt: string;
  publicId?: string;
};

export async function GET() {
  try {
    const images = await prisma.projectImage.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ images });
  } catch (err) {
    console.error("Failed to get images from database:", err);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const images: ProjectImageInput[] = body.images;

    if (
      !Array.isArray(images) ||
      images.some(
        (img) => typeof img.src !== "string" || typeof img.alt !== "string"
      )
    ) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    await prisma.projectImage.deleteMany();

    if (images.length > 0) {
      await prisma.projectImage.createMany({
        data: images.map((image, index) => ({
          src: image.src,
          alt: image.alt,
          publicId: image.publicId ?? null,
          order: index,
        })),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update images:", err);
    return NextResponse.json(
      { error: "Failed to update images" },
      { status: 500 }
    );
  }
}
