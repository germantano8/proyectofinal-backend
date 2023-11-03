const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./src/database/connection');

module.exports = class App{
    constructor(port, routes){
        this.port = port;
        this.routes = routes;
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use('/api', routes)
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}