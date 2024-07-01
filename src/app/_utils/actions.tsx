import { redirect } from "next/navigation";
import {
  CreateFeed,
  authUserLogin,
  authUserSignUp,
  showCurrUser,
} from "../_services/fetchDataAPI";

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

export async function registerUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const user = await authUserSignUp(email, password, name);
  if (user) {
    localStorage.setItem("username", user.name);
    localStorage.setItem("userId", user._id);
    redirect("/home");
  }
}

// export async function PublishFeed(formData) {
//   const content = formData.get("content");

//   if (authData) {
//     const feed = await CreateFeed(content, authData.userId);
//     if (feed) {
//       redirect(`/${authData.name}/status/${feed._id}`);
//     }
//   }
// }

export async function logOutUser() {
  // localStorage.removeItem("username");
  // localStorage.removeItem("userId");
}
