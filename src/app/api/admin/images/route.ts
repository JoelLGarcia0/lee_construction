import { NextResponse } from "next/server";
import prisma from "@/lib/db";

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

    // Clear existing images and insert new ones
    await prisma.projectImage.deleteMany();

    if (body.images && body.images.length > 0) {
      await prisma.projectImage.createMany({
        data: body.images.map((image: any, index: number) => ({
          src: image.src,
          alt: image.alt,
          order: index,
          publicId: image.publicId || null,
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
