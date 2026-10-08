import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import LoginForm from "./LoginForm";
import Title from "@/components/sections/Title";

export const metadata: Metadata = {
  title: "Admin Login",
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
    <main>
      <Title title="Admin Login" />
      <div className="px-8 py-12 md:py-16 bg-greybg">
        <LoginForm />
      </div>
    </main>
  );
}
