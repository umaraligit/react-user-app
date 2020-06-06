import axios from 'axios';

const apiAxios = axios.create ({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

export default class ApiAxiosService {

    // Axios Get Method
    static get(url, headers) {
        return apiAxios
        .get(url, headers)
        .then((res) => {
            return res
        })
        .catch(error => {
            return Promise.reject(error);
        })
    }

    // Axios Post Method
    static post(url, headers) {
        return apiAxios
        .post(url, headers)
        .then((res) => {
            return res
        })
        .catch(error => {
            return Promise.reject(error);
        })
    }
}
