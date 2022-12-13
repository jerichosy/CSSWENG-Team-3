import axios from 'axios';

const url = '\/api/';

export default axios.create({
    // withCredentials: true,
    baseURL: url
});