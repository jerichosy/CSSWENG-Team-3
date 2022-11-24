import http from '../http-common';

class RecordService {
    getAdminSales() {
        return http.get("/adminviewsales");
    }

    getAdminExpenses() {
        return http.get("/adminviewexpense");
    }

    deleteAdminSales(data) {
        console.log(data)
        return http.post("/admindeletesales", data);
    }

    deleteAdminExpense(data) {
        console.log(data)
        return http.post("/admindeleteexpense", data);
    }
}

export default new RecordService();