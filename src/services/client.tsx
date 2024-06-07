import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_CHATTER_URL;

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    language: "en-US",
  },
});

export default client;
