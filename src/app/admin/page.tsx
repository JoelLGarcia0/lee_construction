export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminClient from "@/components/sections/AdminClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return <AdminClient />;
}
