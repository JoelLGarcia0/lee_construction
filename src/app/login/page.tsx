import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | LEE Construction Group",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function LoginPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    redirect("/admin");
  }

  return (
    <main className="flex justify-center items-start px-4 pt-24 pb-12 min-h-[70vh] bg-greybg">
      <LoginForm />
    </main>
  );
}
