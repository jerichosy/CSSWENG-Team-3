import http from '../http-common';

class RecordService {
    getAdminSales() { return http.get("/adminviewsales"); }

    getAdminExpenses() { return http.get("/adminviewexpense"); }

    getAdminCheques() { return http.get("/viewcheque"); }

    addAdminCheque(data) { return http.post("/addcheque", data); }

    editAdminSales(data) { return http.post("/admineditsales", data); }

    editAdminExpense(data) { return http.post("/admineditexpense", data); }

    editAdminCheque(data) { return http.post("/editcheque", data); }

    deleteAdminSales(data) { return http.post("/admindeletesales", data); }

    deleteAdminExpense(data) { return http.post("/admindeleteexpense", data); }

    deleteAdminCheque(data) { return http.post("/deletecheque", data); }

    getCashierSales(params) { return http.get("/viewsales", { params }); }

    getCashierExpenses(params) { return http.get("/viewexpense", { params }); }

    editCashierSales(data) { return http.post("/editsales", data) }

    editCashierExpense(data) { return http.post("/editexpense", data) }
}

export default new RecordService();