import http from '../http-common';

class UserService {
    getBranches(params) {
        return http.get("/viewbranch", { params });
    }

    deleteBranch(data) {
        return http.post("/deletebranch", data);
    }

    editBranchPassword(data) {
        return http.post("/editbranchpassword", data);
    }

    editBranchName(data) {
        return http.post("/editbranchname", data);
    }

    validatePassword(data) {
        // TODO: 
        // give: user _id and password
        // retrieve: boolean whether password is correct or not
        const adminRecord = {
            "_id": 1234,
            "password": 'asdf'
        }

        if (data._id === adminRecord._id && data.password === adminRecord.password) {
            return true
        }
        return false
    }

    createBranch(data) {
        return http.post("/createbranch", data);
    }

    login(data) {
        return http.post("/login", data);
    }
}

export default new UserService();