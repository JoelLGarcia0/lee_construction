"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function LoginPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/admin");
    }
  }, [isSignedIn, router]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Head>
      <div className="flex justify-center pt-24 pb-12 min-h-screen">
        <SignIn
          routing="path"
          path="/login"
          signInUrl="/login"
          forceRedirectUrl="/admin"
        />
      </div>
    </>
  );
}
