const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path: "./config.env"})
const port = process.env.PORT || 5000;

//use middlewares

app.use(cors());
app.use(express.json());

//mongoDB connection

const con = require('./db/connection')
//using routes

app.use(require('./routes/route'))

con.then(db => {
    if(!db) return process.exit(1)
    //listen to the http server

    app.listen(port, () => {
            console.log(`Server is running on PORT :http://localhost:${port}`)
    })

    app.on('error' , err => console.log(`Failled to connect with HTTP Server: ${err}`));

        //error in mongoDB connection
    }).catch(error => {
        console.log(`Connection failed`)
    })





