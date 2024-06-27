import { authUserLogin } from "@/_services/fetchDataAPI";

export const handleLogin = async (e) => {
  console.log(e.target);
  const { email, password } = e.target.result;
  await authUserLogin(email, password);
};
