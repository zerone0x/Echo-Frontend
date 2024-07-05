import { loginUser } from "../_utils/actions";
import SignInButton from "./SignInButton";
import SubmitButton from "./SubmitButton";

function Login() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">Come on in!</h2>
      <SignInButton />
      <form className="flex flex-col" action={loginUser}>
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" required />
        </label>
        <SubmitButton pendingLabel="Loading...">Let's go →</SubmitButton>
      </form>
      <button>signup</button>
    </div>
  );
}

export default Login;
