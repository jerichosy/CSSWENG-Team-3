const express = require('express');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const cors = require('cors');

const app = new express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for req.body

// const dbUser = require('./models/dbUser.js');
// const dbBranch = require('./models/branch/dbBranch.js');
// const dbAdmin = require('./models/admin/dbAdmin.js');

// dbBranch.createConnect();
// dbUser.createConnect();
// dbAdmin.createConnect();

const DB_URI = "mongodb://localhost:27017/CSSWENG-Team-3";

app.listen(3000, function () {
    console.log("Node Server is Running at Port 3000");
});

app.use('/', routes);

db.connect(DB_URI);
