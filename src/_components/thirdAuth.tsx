function handleGoogleSignUp() {
  window.location.href = process.env.NEXT_PUBLIC_GOOGLE_URL;
}
function handleGithubSignUp() {
  window.location.href = process.env.NEXT_PUBLIC_GITHUB_URL;
}
function ThirdAuth() {
  return (
    <div className="flex flex-col">
      <button onClick={handleGoogleSignUp}>Sign up with Google</button>

      <button onClick={handleGithubSignUp}>Sign up with Github</button>
    </div>
  );
}

export default ThirdAuth;
