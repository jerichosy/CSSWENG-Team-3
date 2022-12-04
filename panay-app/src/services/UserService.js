import http from '../http-common';

class UserService {
    getBranches() {
        return http.get("/viewbranch");
    }

    deleteBranch(data) {
        return http.post("/deletebranch", data);
    }

    signup(data) {
        return http.post("/signup", data);
    }

    login(data) {
        return http.post("/login", data);
    }
}

export default new UserService();