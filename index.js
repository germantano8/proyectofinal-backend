const App = require('./app.js');
const PORT = process.env.PORT || 3000;
const router = require('./src/routes/index.js');

const app = new App(PORT, router).listen();