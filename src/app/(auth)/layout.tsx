export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" align-center">
      <main>{children}</main>
    </div>
  );
}
