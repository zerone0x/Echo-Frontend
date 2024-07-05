import NotFound from "@/app/not-found";
import client from "./client";

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

export const logOut = async () => {
  const { data } = await client.get("auth/logout");
  return data.results;
};

export const showCurrUser = async () => {
  try {
    const { data } = await client.get("users/showme");
    return data.results;
  } catch (error) {
    return "error";
  }
};

export const getAllUsers = async () => {
  const { data } = await client.get(`users/`);
  return data.results;
};

export const getUserByName = async (username: string) => {
  const { data } = await client.get(`/users/username/${username}`);
  return data.results;
};

export const CreateFeed = async (content: string, user: string) => {
  const { data } = await client.post("feeds", {
    content: content,
    user: user,
  });
  return data.results;
};

export const GetAllFeeds = async (cursor: string | null) => {
  const url = cursor ? `feeds?cursor=${cursor}` : "feeds";
  const { data } = await client.get(url);
  return data.results;
};

export const DeleteFeedById = async (feedId: string) => {
  const { data } = await client.delete(`feeds/${feedId}`);
  return data.results;
};

export const GetFeedById = async (feedId: string) => {
  const { data } = await client.get(`feeds/${feedId}`);
  // console.log(data);

  return data.results;
};

export const getFeedByUsername = async (username: string) => {
  const { data } = await client.get(`feeds/user/${username}`);
  return data.results;
};

export const BookMarkFeed = async (feedId: string, user: string) => {
  const { data } = await client.post(`bookmark/booked`, {
    feedId: feedId,
    user: user,
  });
  return data.results;
};

export const getAllBookMark = async (user: string) => {
  const { data } = await client.get(`bookmark/getAllBookMark`, {
    // user: user,
  });
  return data.results;
};

export const getIsBooked = async (feedId: string) => {
  const { data } = await client.get(`bookmark/getIsBooked/${feedId}`, {});
  return data.results;
};

export const LikeFeed = async (feedId: string, user: string) => {
  const { data } = await client.post(`like/likedfeed`, {
    feedId: feedId,
    user: user,
  });
  return data.results;
};

export const getAllLikes = async (user: string) => {
  const { data } = await client.get(`like/getAllLikes`, {
    // user: user,
  });
  return data.results;
};

export const getIsLiked = async (feedId: string) => {
  const { data } = await client.get(`like/getIsLiked/${feedId}`, {});
  return data.results;
};

export const AddFollow = async (idolName: string) => {
  const { data } = await client.post(`follow/AddFollow`, {
    idolName: idolName,
    // user: user,
  });
  return data.results;
};

export const getFollow = async (username: string) => {
  const { data } = await client.get(`follow/getFollow/${username}`);
  return data.results;
};

export const getFans = async (username: string) => {
  const { data } = await client.get(`follow/getFans/${username}`);
  return data.results;
};

export const getIsFollowed = async (username: string) => {
  const { data } = await client.get(`like/getIsFollowed/${username}`);
  return data.results;
};
