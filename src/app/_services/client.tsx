import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ECHO_URL;
export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  params: {
    language: "en-US",
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export const mediaClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  params: {
    language: "en-US",
  },
});
