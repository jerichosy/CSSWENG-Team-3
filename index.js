const express = require('express');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for req.body

// const dbUser = require('./models/dbUser.js');
// const dbBranch = require('./models/branch/dbBranch.js');
// const dbAdmin = require('./models/admin/dbAdmin.js');

// dbBranch.createConnect();
// dbUser.createConnect();
// dbAdmin.createConnect();

app.listen(3000, function () {
    console.log("Node Server is Running at Port 3000");
});

app.use('/', routes);

db.connect();
