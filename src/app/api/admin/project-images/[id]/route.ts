import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.$connect();

    const imageToDelete = await prisma.projectImage.findUnique({
      where: { id },
    });

    if (!imageToDelete) {
      await prisma.$disconnect();
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Remove from Cloudinary
    if (imageToDelete.publicId) {
      try {
        await cloudinary.uploader.destroy(imageToDelete.publicId);
      } catch (error) {
        console.error("Cloudinary delete error:", error);
      }
    }

    // Delete from database
    await prisma.projectImage.delete({
      where: { id },
    });

    // Reorder remaining images
    const remainingImages = await prisma.projectImage.findMany({
      orderBy: { order: "asc" },
    });

    // Update orders for remaining images
    for (let i = 0; i < remainingImages.length; i++) {
      await prisma.projectImage.update({
        where: { id: remainingImages[i].id },
        data: { order: i },
      });
    }

    await prisma.$disconnect();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete failed:", err);
    await prisma.$disconnect();
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
