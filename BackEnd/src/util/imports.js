const express = require('express');
const app = express();

//importas
app.use(require('../routes/usersRoutes'));

module.exports = app;