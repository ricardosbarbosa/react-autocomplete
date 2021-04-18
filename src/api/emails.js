import axios from "axios";

export const getEmails = (params) => {
  return axios({
    baseURL: "http://localhost:3001",
    method: "GET",
    params,
    url: "/emails"
  })
}