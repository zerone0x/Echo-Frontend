import Link from "next/link";

export default async function App() {
  return (
    <>
      <Link href="/login">Login</Link>
      <Link href="/signup">Register</Link>
    </>
  );
}
