import Axios from "axios";

// 基于axios封装一下
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
console.log("axios is "+baseUrl)

export const axios = Axios.create({
  baseURL: baseUrl,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    // toast.error(message);
    console.log(message);
    return Promise.reject(error);
  }
);


// axios.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const message = error.response?.data?.message || error.message;
//     // toast.error(message);
//     console.log(message);
//     return Promise.reject(error);
//   }
// );