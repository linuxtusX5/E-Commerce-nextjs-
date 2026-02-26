import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-gray-900">
              {siteConfig.name}
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm w-200">
          {children}
        </div>
      </div>
    </div>
  );
}
