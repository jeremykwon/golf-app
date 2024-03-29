import Axios, { AxiosInstance } from "axios";
import { getStorage } from "Lib/Storage";

const axios = Axios.create({
  // baseURL: `http://43.200.94.166:9000`,
  baseURL: `https://port-0-holeserver-p8xrq2mlftjzauj.sel3.cloudtype.app`,

  // baseURL: ``,
  // headers: {
  //     'Cache-Control': 'no-cache',
  // },
});

Axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    let token = getStorage({ key: "user_info" })?.token;

    const newHeaders = {
      authorization: token,
      "Cache-Control": "no-cache",
    };

    config.headers = newHeaders;

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 인증 실패 시 로그아웃
    if (error?.response?.status === 401) {
      alert("Invalid Token");
      window.location.href = "/signin";
    }
    if (error?.response?.status === 419) {
      alert("Token has Expired");
      window.location.href = "/signin";
    }

    return Promise.reject(error.response || error);
  }
);

const sendAPI = async ({
  url,
  method = "get",
  data = {},
  headers = { "Content-Type": "application/json" },
}) => {
  try {
    return await axios({
      url: `${url}`,
      method,
      data,
      headers,
    });
  } catch (err) {
    if (err?.data?.response?.message === "Not Found User.") {
      // clearUser();
      window.location.reload();
    }
    throw err;
  }
};

export default sendAPI;

// 사용 샘플
// const sample = async ({
//     url,
//     method = 'get',
//     options = {},
// }) => {
//     try {
//         return await sendAPI({ url, method, options });
//     } catch (err) {
//         throw err;
//     }
// };
