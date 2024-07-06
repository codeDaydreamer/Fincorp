const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Categories schema
const categoriesModel = new Schema({
    type: { type: String, default: "Investment" },
    color: { type: String, default: "#fcbe44" }
});

// Transactions schema
const transactionsModel = new Schema({
    name: { type: String, default: "Anonymous" },
    type: { type: String, default: "Investment" },
    amount: { type: Number },
    date: { type: Date, default: Date.now }
});

// Define models
const Categories = mongoose.model('categories', categoriesModel);
const Transactions = mongoose.model('transactions', transactionsModel);

// Export models
module.exports = {
    Categories,
    Transactions
};
