import { loginUser } from "../_utils/actions";
import SignInButton from "./SignInButton";
import SubmitButton from "./SubmitButton";

function Login() {
  return (
    <form className="flex flex-col gap-4" action={loginUser}>
      <label className="flex flex-col text-xl" htmlFor="email">
        Email
        <input
          className="rounded"
          type="email"
          id="email"
          name="email"
          required
        />
      </label>
      <label className="flex flex-col text-xl" htmlFor="password">
        Password
        <input
          className="rounded"
          type="password"
          id="password"
          name="password"
          required
        />
      </label>
      <SubmitButton pendingLabel="Loading...">Let's go →</SubmitButton>
    </form>
  );
}

export default Login;
