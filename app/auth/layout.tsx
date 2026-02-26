// This layout renders no header/footer — clean centered auth UI
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
