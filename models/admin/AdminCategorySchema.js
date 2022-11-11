const mongoose = require('mongoose');

const AdminCategorySchema = new mongoose.Schema({
    name:       {type: String, required: true}
}, {timestamps: true});

module.exports = AdminCategorySchema;