import { mediaClient, client } from "./client";

export const authUserLogin = async (email: string, password: string) => {
  const { data } = await client.post("auth/login", {
    email: email,
    password: password,
  });
  return data.results;
};

export const authUserSignUp = async (
  email: string,
  password: string,
  name: string,
) => {
  const { data } = await client.post("auth/register", {
    email: email,
    password: password,
    name: name,
  });
  return data.results;
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
  const { data } = await client.get(`users/username/${username}`);
  return data.results;
};

export const updateUser = async (formData: FormData) => {
  const { data } = await mediaClient.post(`users/updateUser`, formData);
  return data.results;
};

export const CreateFeed = async (formData: FormData) => {
  const { data } = await mediaClient.post("feeds", formData);
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
  return data.results;
};

export const getFeedByUsername = async (username: string) => {
  const { data } = await client.get(`feeds/user/${username}`);
  return data.results;
};

export const searchFeeds = async (keyword: string) => {
  const { data } = await client.post(`feeds/searchFeeds`, {
    keyword: keyword,
  });
  return data.results;
};

export const BookMarkFeed = async (feedId: string, itemType: string) => {
  const { data } = await client.post(`bookmark/booked`, {
    feedId: feedId,
    itemType: itemType,
  });
  return data.results;
};

export const getAllBookMark = async () => {
  const { data } = await client.get(`bookmark/getAllBookMark`);
  return data.results;
};

export const getIsBooked = async (feedId: string, itemType: string) => {
  const { data } = await client.get(
    `bookmark/getIsBooked/${feedId}/${itemType}`,
  );
  return data.results;
};

export const LikeFeed = async (feedId: string, itemType: string) => {
  const { data } = await client.post(`like/likedfeed`, {
    feedId: feedId,
    itemType: itemType,
  });
  return data.results;
};

export const getAllLikes = async () => {
  const { data } = await client.get(`like/getAllLikes`);
  return data.results;
};

export const getIsLiked = async (feedId: string, itemType: string) => {
  const { data } = await client.get(`like/getIsLiked/${feedId}/${itemType}`);
  return data.results;
};

export const GetCountOfLikes = async (feedId: string, itemType: string) => {
  const { data } = await client.get(
    `like/GetCountOfLikes/${feedId}/${itemType}`,
  );
  return data.results;
};

export const AddFollow = async (idolName: string) => {
  const { data } = await client.post(`follow/AddFollow`, {
    idolName: idolName,
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
  const { data } = await client.get(`follow/getIsFollowed/${username}`);
  return data.results;
};

export const getCommentsByFeedID = async (feedId: string) => {
  const { data } = await client.get(`comments/getCommentsByFeedID/${feedId}`);
  return data.results;
};

export const deleteCommentById = async (feedId: string) => {
  const { data } = await client.delete(`comments/${feedId}`);
  return data.results;
};

export const getAllNotifications = async () => {
  try {
    const { data } = await client.get("notification/GetAllNotifications");
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
