"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm bg-white p-8 rounded-lg shadow space-y-5"
    >
      <h1 className="text-2xl font-bold text-darkblue text-center">
        Admin Login
      </h1>

      <div>
        <label
          htmlFor="username"
          className="block font-medium text-gray-800 pb-2"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block font-medium text-gray-800 pb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue"
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
        className="w-full flex items-center justify-center gap-2 bg-blue text-white font-semibold py-2 px-4 rounded hover:bg-darkblue transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending && <Loader2 className="animate-spin" size={16} />}
        Sign In
      </button>
    </form>
  );
}
