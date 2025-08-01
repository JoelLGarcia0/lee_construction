// app/admin/page.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminClient from "@/components/sections/AdminClient";

export default function AdminPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  if (!isSignedIn) return null;

  return <AdminClient />;
}
