import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const analyseObjection = async (input) => {
  const response = await API.post("/analyse", {
    input,
  });

  return response.data;
};