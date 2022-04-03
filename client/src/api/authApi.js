import axios from "axios";
const baseUrl = "https://api.serius.uz/api/v1/admin";

export const authApi = {
   login: (data) => axios.post(
      `${baseUrl}/login`,
      data
   )
}