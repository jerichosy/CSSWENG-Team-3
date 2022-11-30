import http from '../http-common';

class RecordService {
    getAdminSales() { return http.get("/adminviewsales"); }

    getAdminExpenses() { return http.get("/adminviewexpense"); }

    getAdminCheques() { return http.get("/adminviewcheque"); }

    addAdminCheque(data) { return http.post("/adminaddcheque", data); }

    editAdminSales(data) { return http.post("/admineditsales", data); }

    editAdminExpense(data) { return http.post("/admineditexpense", data); }

    editAdminCheque(data) { return http.post("/admineditcheque", data); }

    deleteAdminSales(data) { return http.post("/admindeletesales", data); }

    deleteAdminExpense(data) { return http.post("/admindeleteexpense", data); }

    deleteAdminCheque(data) { return http.post("/admindeletecheque", data); }
}

export default new RecordService();