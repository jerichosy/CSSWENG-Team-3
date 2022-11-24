import http from '../http-common';

class RecordService {
    getFiltered(data) {
        return http.get("/", data);
    }
}

export default new RecordService();