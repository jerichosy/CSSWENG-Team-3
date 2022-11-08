const express = require('express');
const routes = require('./routes/routes.js');

const app = new express();

app.listen(3000, function() {
    console.log("Node Server is Running at Port 3000");
});

app.use('/', routes);
