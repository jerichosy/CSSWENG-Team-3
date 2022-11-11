import http from '../http-common';

class UserService {
    getAll() {
        return http.get("/displayusers");
    }

    get(id) {
        return http.get(`/users/${id}`);
    }
}

export default new UserService();