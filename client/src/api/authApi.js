import axios from "axios";
const baseUrl = "http://localhost:4002/api/v1/admin";

export const authApi = {
   login: (data) => axios.post(
      `${baseUrl}/login`,
      data
   )
}