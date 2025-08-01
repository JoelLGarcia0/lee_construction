import { NextResponse } from "next/server";
import prisma from "@/lib/db";

type ProjectImageInput = {
  src: string;
  alt: string;
  publicId?: string;
};

export async function GET() {
  try {
    // Check if we can connect to the database
    await prisma.$connect();

    const images = await prisma.projectImage.findMany({
      orderBy: { order: "asc" },
    });

    await prisma.$disconnect();
    return NextResponse.json({ images });
  } catch (err) {
    console.error("Failed to get images from database:", err);
    await prisma.$disconnect();
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

    await prisma.$connect();
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

    await prisma.$disconnect();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update images:", err);
    await prisma.$disconnect();
    return NextResponse.json(
      { error: "Failed to update images" },
      { status: 500 }
    );
  }
}
