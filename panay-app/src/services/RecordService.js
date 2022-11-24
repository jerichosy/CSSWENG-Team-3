import http from '../http-common';

class RecordService {
    getAdminSales() {
        return http.get("/adminviewsales");
    }

    getAdminExpenses() {
        return http.get("/adminviewexpense");
    }
}

export default new RecordService();