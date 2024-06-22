import { useMutation } from "react-query";
import { authUserLogin } from "@/_services/fetchDataAPI";
import { useAuth } from "@/_data/getLogin";

const useLogin = () => {
  const { authData, setAuthData } = useAuth();

  return useMutation(({ email, password }) => authUserLogin(email, password), {
    onSuccess: (data) => {
      setAuthData(data);
      // console.log(data);
      console.log(authData);
    },
  });
};

export default useLogin;
