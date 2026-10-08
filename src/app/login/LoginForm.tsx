"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { login } from "./actions";
import { button } from "@/lib/styles";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm mx-auto bg-white border border-gray-200 p-8 space-y-5"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-semibold text-gray-700 pb-1.5"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 pb-1.5"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`w-full ${button.primary} cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {pending && <Loader2 className="animate-spin" size={16} />}
        Sign In
      </button>
    </form>
  );
}
