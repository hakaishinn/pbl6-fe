import axios from "axios"

function CallApi(endpoint, method = 'GET', body = null) {
    return axios({
        method : method,
        url: `http://localhost:4000/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}

export default CallApi;