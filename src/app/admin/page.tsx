export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminClient from "@/components/sections/AdminClient";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return <AdminClient />;
}
