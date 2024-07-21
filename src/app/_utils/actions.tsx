import { redirect } from "next/navigation";
import { authUserLogin, authUserSignUp } from "../_services/fetchDataAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await authUserLogin(email, password);
  if (user) {
    toast.success("Message posted successfully!");
    redirect("/home");
  }
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const user = await authUserSignUp(email, password, name);
  if (user) {
    localStorage.setItem("username", user.name);
    localStorage.setItem("userId", user._id);
    redirect("/home");
  }
}
