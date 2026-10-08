export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
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
  // Middleware already guards /admin; this is a second check at render time.
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!(await verifySessionToken(token))) {
    redirect("/login");
  }

  return <AdminClient />;
}
