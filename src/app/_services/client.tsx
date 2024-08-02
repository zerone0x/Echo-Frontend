import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_ENV === "PRD"
    ? process.env.NEXT_PUBLIC_ECHO_URL
    : process.env.NEXT_PUBLIC_STG_ECHO_URL;
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

// image use non-text content-type, so created a new one
export const mediaClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  params: {
    language: "en-US",
  },
});
