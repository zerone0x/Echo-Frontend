import { registerUser } from "../_utils/actions";
import SignInButton from "./SignInButton";
import SubmitButton from "./SubmitButton";

function SignUpForm() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center justify-center">
      <h1 className="text-3xl font-semibold">Sign up for Echo</h1>
      <SignInButton />
      <form className="flex flex-col" action={registerUser}>
        <label htmlFor="name">
          Your full name
          <input type="text" id="name" name="name" required />
        </label>
        <label htmlFor="email">
          Your email address
          <input type="email" id="email" name="email" required />
        </label>
        <label htmlFor="password">
          A secret password
          <input type="password" id="password" name="password" required />
        </label>
        <SubmitButton pendingLabel="Loading...">
          Create a Echo account
        </SubmitButton>
      </form>
    </div>
  );
}

export default SignUpForm;
