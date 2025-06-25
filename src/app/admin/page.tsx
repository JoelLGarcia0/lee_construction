import { auth } from "@clerk/nextjs/server";
import AdminClient from "@/components/sections/AdminClient";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) return null;

  return <AdminClient />;
}
