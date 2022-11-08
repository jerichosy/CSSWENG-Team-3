var path = require('path');

const controller = {
    getIndex: (req, res) => {
        res.sendFile(path.resolve('./views/login.html'))
    }
}

module.exports = controller;