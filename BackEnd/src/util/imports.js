const express = require('express');
const app = express();

//importas
app.use(require('../routes/usersRoutes'));
app.use(require('../routes/AuthenticateRoutes'));
app.use(require('../routes/ExcelRoutes'));
module.exports = app;