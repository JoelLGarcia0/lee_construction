import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const current = (await redis.get("lee-images")) as any[];

  if (!current)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const imageToDelete = current.find((img) => img.id === id);

  if (!imageToDelete) {
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

  const filtered = current.filter((img) => img.id !== id);
  filtered.forEach((img, idx) => (img.order = idx));
  await redis.set("lee-images", filtered);

  return NextResponse.json({ success: true });
}
