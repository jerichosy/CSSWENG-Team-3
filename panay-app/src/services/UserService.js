import http from '../http-common';

class UserService {
    getBranches() {
        return http.get("/viewbranch");
    }

    deleteBranch(data) {
        return http.post("/deletebranch", data);
    }

    changeBranchPassword(data) {
        console.log(data);
        // return http.post("/changebranchpassword", data);
    }

    changeBranchName(data) {
        return http.post("/changebranchname", data);
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