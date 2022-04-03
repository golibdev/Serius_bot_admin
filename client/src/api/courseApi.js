import axios from "axios";
const baseUrl = "https://api.serius.uz/api/v1/course";
const token = localStorage.getItem("token");

export const courseApi = {
   getAll: () => axios.get(
      `${baseUrl}`,
      {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   getById: (id) => axios.get(
      `${baseUrl}/${id}`,
      {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   create: (data) => axios.post(
      `${baseUrl}`,
      data,
      {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   update: (id, data) => axios.put(
      `${baseUrl}/${id}`,
      data,
      {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   delete: (id) => axios.delete(
      `${baseUrl}/${id}`,
      {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      }
   )
}