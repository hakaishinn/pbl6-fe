import axios from 'axios';
import https from 'https'

const request = axios.create({
    baseURL: 'https://localhost:7116/api/',
    // headers: {
    //     'content-type': 'application/json',
    // },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
});

// request.interceptors.request.use(async (config) => {
//     // Handle token here ...
//     return config;
// });

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
