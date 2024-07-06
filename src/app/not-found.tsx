import Link from "next/link";

function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
