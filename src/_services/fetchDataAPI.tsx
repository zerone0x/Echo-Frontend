import client from "./client";

export const authUserRegister = async () => {
  const { data } = await client.get("auth/register");
  return data.results;
};

export const authUserLogin = async (email, password) => {
  const { data } = await client.post("auth/login", {
    email: email,
    password: password,
  });
  return data.results.user;
};

export const authUserSignUp = async (email, password, name) => {
  const { data } = await client.post("auth/register", {
    email: email,
    password: password,
    name: name,
  });
  return data.results.user;
};

export const CreateFeed = async (content, user) => {
  const { data } = await client.post("feeds", {
    content: content,
    user: user,
  });
  return data.results;
};

export const GetAllFeeds = async () => {
  const { data } = await client.get("feeds");
  console.log(data.results);
  return data.results;
};

export const DeleteFeed = async (feedId: string) => {
  const { data } = await client.delete(`feeds/${feedId}`);
  return data.results;
};

export const GetFeedById = async (feedId: string) => {
  const { data } = await client.get(`feeds/${feedId}`);
  return data.results;
};
