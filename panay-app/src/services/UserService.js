import http from '../http-common';

class UserService {
    getAll() {
        return http.get("/displayusers");
    }

    signup(data) {
        return http.post("/signup", data);
    }

    login(data) {
        return http.post("/login", data);
    }
}

export default new UserService();