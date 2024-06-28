import { useMutation } from "react-query";
import { authUserSignUp } from "@/app/_services/fetchDataAPI";

const useRegister = () => {
  return useMutation(({ email, password, name }) =>
    authUserSignUp(email, password, name),
  );
};

export default useRegister;
