require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const {sequelize} = require('./src/database/connection');
const router = require('./src/routes/index.js');

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});