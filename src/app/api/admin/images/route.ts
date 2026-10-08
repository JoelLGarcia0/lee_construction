import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

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

// Saves the display order. Only each photo's `order` changes, all in one
// transaction, so IDs and upload dates are kept and a failure changes nothing.
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const images: { id: string }[] = body.images;

    if (
      !Array.isArray(images) ||
      images.some((img) => typeof img?.id !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      images.map((image, index) =>
        prisma.projectImage.update({
          where: { id: image.id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/projects");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update image order:", err);
    return NextResponse.json(
      { error: "Failed to update image order" },
      { status: 500 }
    );
  }
}
