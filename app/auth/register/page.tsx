import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth/helpers";
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SocialLogin } from "@/components/auth/SocialLogin";

export const metadata = { title: "Create Account" };

export default async function RegisterPage() {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join thousands of happy customers"
    >
      <RegisterForm />
      <SocialLogin />

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
