import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/lib/auth/helpers";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Sign In — MyStore" };

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <AuthCard
      badge="Welcome back"
      title={"Welcome\nBack"}
      subtitle={"Sign in to continue\nyour journey!"}
    >
      {/* Suspense required because LoginForm uses useSearchParams */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
