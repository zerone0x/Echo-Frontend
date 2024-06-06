import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    language: "en-US",
  },
});

export default client;
