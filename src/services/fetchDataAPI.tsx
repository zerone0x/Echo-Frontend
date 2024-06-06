import client from "./client";

export const authUserRegister = async () => {
  const { data } = await client.get("auth/register");
  return data.results;
};

export const authUserLogin = async (email, password) => {
  const response = await client.post("auth/login", {
    email: email,
    password: password,
  });
  return response.user.email;
};

// export const authUserGoogle = async () => {
//   const { data } = await client.get('auth/google')
//   return data.results
// }

// export const authUserGithub = async () => {
//   await client.get('auth/github')
// }
