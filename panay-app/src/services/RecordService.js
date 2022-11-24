import http from '../http-common';

class RecordService {
    getAdminSales() {
        return http.get("/adminviewsales");
    }
}

export default new RecordService();