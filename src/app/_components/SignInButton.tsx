import Image from "next/image";

function SignInButton() {
  return (
    <>
      <form action={process.env.NEXT_PUBLIC_GOOGLE_URL} method="GET">
        <button
          type="submit"
          className="flex items-center gap-6 rounded border border-gray-300 px-8 py-3 text-lg font-medium"
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>
      <form action={process.env.NEXT_PUBLIC_GITHUB_URL} method="GET">
        <button
          type="submit"
          className="flex items-center gap-6 rounded border border-gray-300 px-8 py-3 text-lg font-medium"
        >
          <Image
            src="https://authjs.dev/img/providers/github.svg"
            alt="Github logo"
            height="24"
            width="24"
          />
          <span>Continue with Github</span>
        </button>
      </form>
    </>
  );
}

export default SignInButton;
