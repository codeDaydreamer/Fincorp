const model = require('../models/model');

// POST http://localhost:8080/api/categories
async function createCategories(req, res) {
    const { type, color } = req.body; // Assuming type and color are sent in the request body

    console.log("Incoming data:", req.body); // Log the incoming request body

    const create = new model.Categories({
        type: type || "Investment", // Default to "Investment" if not provided
        color: color || "#fcbe44" // Default to "#fcbe44" if not provided
    });

    try {
        const savedCategory = await create.save();
        res.json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}

// GET http://localhost:8080/api/categories
async function getCategories(req, res) {
    try {
        const data = await model.Categories.find({});
        const filter = data.map(v => ({ type: v.type, color: v.color }));
        res.json(filter);
    } catch (err) {
        res.status(500).json({ message: `Error while getting categories: ${err.message}` });
    }
}

// POST http://localhost:8080/api/transactions
async function createTransactions(req, res) {
    const { name, type, amount } = req.body; // Assuming name, type, and amount are sent in the request body

    const create = new model.Transactions({
        name: name || "Anonymous", // Default to "Anonymous" if name is not provided
        type: type || "Investment", // Default to "Investment" if type is not provided
        amount,
        date: new Date()
    });

    try {
        const savedTransaction = await create.save();
        res.json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: `Error while creating transaction: ${err.message}` });
    }
}

// GET http://localhost:8080/api/transactions
async function getTransactions(req, res) {
    try {
        const data = await model.Transactions.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: `Error while getting transactions: ${err.message}` });
    }
}

// DELETE http://localhost:8080/api/transactions/:id
async function deleteTransaction(req, res) {
    const { id } = req.params;

    try {
        const deletedTransaction = await model.Transactions.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `Error while deleting transaction: ${err.message}` });
    }
}
// GET http://localhost:8080/api/labels
async function getLabels(req, res) {
    try {
        const result = await model.Transactions.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categoriesInfo"
                }
            },
            {
                $unwind: "$categoriesInfo"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    type: 1,
                    amount: 1,
                    color: "$categoriesInfo.color"
                }
            }
        ]);

        // Log result length and sample data for debugging
        console.log("Labels found:", result.length); // Check number of documents found
        console.log("Sample data:", result.length > 0 ? result[0] : "No data");

        res.json(result);
    } catch (err) {
        console.error("Error during lookup aggregation:", err);
        res.status(400).json({ message: `Lookup collection error: ${err.message}` });
    }
}

module.exports = {
    createCategories,
    getCategories,
    createTransactions,
    getTransactions,
    deleteTransaction,
    getLabels
};
