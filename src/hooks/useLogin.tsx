import { useMutation } from "react-query";
import { authUserLogin } from "@/services/fetchDataAPI";

const useLogin = () => {
  return useMutation(({ email, password }) => authUserLogin(email, password));
};

export default useLogin;
