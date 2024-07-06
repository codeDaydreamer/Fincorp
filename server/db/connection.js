const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI)
    .then(db => {
        console.log(`Database connected`);
        return db;
    }).catch(err => {
        console.log(`Conection error`)
    })


    module.exports = conn;