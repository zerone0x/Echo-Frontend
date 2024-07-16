import { loginUser } from "../_utils/actions";
import SignInButton from "./SignInButton";
import SubmitButton from "./SubmitButton";

function Login() {
  return (
    <form
      className="flex w-full max-w-md flex-col gap-4 border border-gray-300 p-8 shadow-lg"
      action={loginUser}
    >
      <label className="text-xl" htmlFor="email">
        Email
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          required
        />
      </label>
      <label className="text-xl" htmlFor="password">
        Password
        <input
          className="input"
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
