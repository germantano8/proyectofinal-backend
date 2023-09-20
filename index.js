require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const sequelize = require('./src/database/connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/routes/index.js');

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router);