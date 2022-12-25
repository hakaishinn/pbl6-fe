import axios from 'axios';
import https from 'https';

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Referrer-Policy': 'unsafe_url',
    // },
});

request.interceptors.request.use(async (config) => {
    const userToken = await localStorage.getItem('userToken');
    if (userToken) {
        const token = JSON.parse(userToken).token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// request.interceptors.response.use(
//     (response) => {
//         if (response && response.data) {
//             return response.data;
//         }
//         return response;
//     },
//     (error) => {
//         // Handle errors
//         throw error;
//     },
// );

export default request;
