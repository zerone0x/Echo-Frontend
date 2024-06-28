import { redirect } from "next/navigation";
import { authUserLogin } from "../_services/fetchDataAPI";
import { cookies } from "next/headers";

export async function loginUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const user = await authUserLogin(email, password);
  if (user) {
    localStorage.setItem("username", user.name);
    localStorage.setItem("userId", user._id);
    redirect("/home");
  }
}

export async function registerUser(formData) {}

export async function logOutUser() {
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
}
