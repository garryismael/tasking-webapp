import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const http = axios.create({
  baseURL,
});

export default http;
