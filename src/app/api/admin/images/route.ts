import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const raw = await redis.get("lee-images");
    const images = typeof raw === "string" ? JSON.parse(raw) : raw;
    return NextResponse.json({ images: images || [] });
  } catch (err) {
    console.error("Failed to get images from Redis:", err);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();

  // Always stringify when storing objects/arrays in Redis
  await redis.set("lee-images", JSON.stringify(body.images));

  return NextResponse.json({ success: true });
}
