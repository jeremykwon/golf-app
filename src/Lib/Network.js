import Axios, { AxiosInstance } from 'axios';
// import { getSession, clearUser } from 'lib/auth';

const axios = Axios.create({
    baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`,
    headers: { 'Cache-Control': 'no-cache' },
});

axios.interceptors.request.use(
    (config) => {
        // const session = getSession();   // storage

        // if (session) {
        const newHeaders = {
            // session,
        };

        if (!config) {
            config = {
                headers: newHeaders,
            };
        } else if (!config.headers) {
            config.headers = newHeaders;
        } else {
            config.headers = {
                ...config.headers,
                ...newHeaders,
            };
        }
        // }

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
            window.location.reload();
        }

        console.error(error);
        return Promise.reject(error.response || error);
    }
);

const sendAPI = async ({ url, method = 'get', options = {} }) => {
    try {
        return await axios({
            url: `${url}`,
            method,
            ...options,
        });
    } catch (err) {
        if (err?.data?.response?.message === 'Not Found User.') {
            // clearUser();
            window.location.reload();
        }
        throw err;
    }
}

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
