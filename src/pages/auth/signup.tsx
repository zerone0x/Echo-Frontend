"use client";
function SignUp() {
  function handleGoogleSignUp() {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_URL;
  }
  function handleGithubSignUp() {
    window.location.href = process.env.NEXT_PUBLIC_GITHUB_URL;
  }
  return (
    <body className="text-center space-y-5">
      <h1 className="text-lg text-green-300">Sign up for Chatter</h1>
      <div className="flex flex-col">
        <button onClick={handleGoogleSignUp}>Sign up with Google</button>

        <button onClick={handleGithubSignUp}>Sign up with Github</button>
      </div>
      <form className="flex flex-col">
        <label htmlFor="name">
          Your full name
          <input type="text" id="name" name="name" />
        </label>
        <label htmlFor="email">
          Your email address
          <input type="email" id="email" name="email" />
        </label>
        <label htmlFor="password">
          A secret password
          <input type="password" id="password" name="password" />
        </label>
        <button type="submit">Create a Chatter account</button>
      </form>
    </body>
  );
}

export default SignUp;
