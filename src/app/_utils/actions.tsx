import { redirect } from "next/navigation";
import { authUserLogin, authUserSignUp } from "../_services/fetchDataAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await authUserLogin(email, password);
  if (user) {
    // toast.success("Message posted successfully!");
    redirect("/home");
  }
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const user = await authUserSignUp(email, password, name);
  if (user) {
    redirect("/home");
  }
}

export async function loginTestUser() {
  const email = process.env.NEXT_PUBLIC_USER;
  const password = process.env.NEXT_PUBLIC_PWD;
  // @ts-ignore
  const user = await authUserLogin(email, password);
  if (user) {
    redirect("/home");
  }
}
