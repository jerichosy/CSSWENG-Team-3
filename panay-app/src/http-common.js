import axios from 'axios';

const url = 'http://localhost:3000/';

export default axios.create({
    withCredentials: true,
    baseURL: url
});