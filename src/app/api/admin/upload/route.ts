import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/db";
import { CATEGORIES, UPLOAD_FOLDER } from "@/lib/uploads";

// The browser uploads the file directly to Cloudinary (see ./sign), then calls
// this route with Cloudinary's response so we can record it in the database.
export async function POST(req: Request) {
  const { publicId, version, signature, secureUrl, originalFilename, category } =
    await req.json();

  if (!category || !CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: "Valid category required" },
      { status: 400 }
    );
  }

  // Confirm this upload really came from our Cloudinary account and folder.
  const urlPrefix = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/`;
  const isGenuine =
    typeof secureUrl === "string" &&
    secureUrl.startsWith(urlPrefix) &&
    typeof publicId === "string" &&
    publicId.startsWith(`${UPLOAD_FOLDER}/`) &&
    signature ===
      cloudinary.utils.api_sign_request(
        { public_id: publicId, version },
        process.env.CLOUDINARY_API_SECRET!
      );

  if (!isGenuine) {
    return NextResponse.json(
      { error: "Invalid upload signature" },
      { status: 400 }
    );
  }

  try {
    await prisma.$connect();

    // Get the current highest order for this category
    const maxOrder = await prisma.projectImage.aggregate({
      where: { category },
      _max: { order: true },
    });
    const newOrder = (maxOrder._max.order ?? -1) + 1;

    const image = await prisma.projectImage.create({
      data: {
        src: secureUrl,
        alt: originalFilename || "Project image",
        category,
        publicId,
        order: newOrder,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(image);
  } catch (err) {
    console.error("Saving upload failed:", err);
    await prisma.$disconnect();
    return NextResponse.json(
      { error: "Uploaded, but failed to save to database" },
      { status: 500 }
    );
  }
}
