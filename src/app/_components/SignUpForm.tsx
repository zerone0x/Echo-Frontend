import { registerUser } from "../_utils/actions";
import SignInButton from "./SignInButton";
import SubmitButton from "./SubmitButton";

function SignUpForm() {
  return (
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
  );
}

export default SignUpForm;
