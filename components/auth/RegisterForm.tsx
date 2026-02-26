"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { registerAction, type ActionState } from "@/lib/auth/actions";

const initialState: ActionState = { success: false, message: "" };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-red-600 w-50 h-50">test</div>
      <form action={formAction} className="space-y-4" noValidate>
        {state.message && !state.success && !state.errors && (
          <Alert type="error" message={state.message} />
        )}

        <Input
          id="name"
          name="name"
          label="Full name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          required
          error={state.errors?.name?.[0]}
        />

        <Input
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          error={state.errors?.email?.[0]}
        />

        <div className="relative">
          <Input
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            autoComplete="new-password"
            required
            error={state.errors?.password?.[0]}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Password strength hint */}
        <ul className="space-y-1 text-xs text-gray-500">
          <li>• At least 8 characters</li>
          <li>• At least one uppercase letter</li>
          <li>• At least one number</li>
        </ul>

        <Button type="submit" size="lg" className="w-full" loading={isPending}>
          Create account
        </Button>

        <p className="text-center text-xs text-gray-500">
          By creating an account you agree to our{" "}
          <a href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
