"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/admin");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center pt-24 pb-12 min-h-screen">
      <SignIn
        routing="path"
        path="/login"
        signInUrl="/login"
        forceRedirectUrl="/admin"
      />
    </div>
  );
}
