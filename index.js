require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const {Sequelize} = require('sequelize');
const db = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    }
    );

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.log('Unable to connect to the database.');
});

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});