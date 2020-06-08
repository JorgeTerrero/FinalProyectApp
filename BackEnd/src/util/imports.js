const express = require('express');
const app = express();

//importas
app.use(require('../routes/UsersRoutes'));
app.use(require('../routes/AuthenticateRoutes'));
app.use(require('../routes/ExcelRoutes'));
app.use(require('../routes/DocumentRoutes'));
app.use(require('../routes/VesselRoute'));
app.use(require('../routes/FreightRoutes'));
app.use(require('../routes/CompanyRoutes'));

module.exports = app;