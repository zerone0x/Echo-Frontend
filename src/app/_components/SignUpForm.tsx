import { registerUser } from "../_utils/actions";
import SignInButton from "./SignInButton";
import SubmitButton from "./SubmitButton";

function SignUpForm() {
  return (
    <form
      className="flex w-full max-w-md flex-col gap-4 border border-gray-300 p-8 shadow-lg"
      action={registerUser}
    >
      <label htmlFor="name" className="text-xl">
        Your full name
        <input type="text" id="name" name="name" className="input" required />
      </label>
      <label htmlFor="email" className="text-xl">
        Your email address
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          required
        />
      </label>
      <label htmlFor="password" className="text-xl">
        A secret password
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          required
        />
      </label>
      <SubmitButton pendingLabel="Loading...">Create Account</SubmitButton>
    </form>
  );
}

export default SignUpForm;
