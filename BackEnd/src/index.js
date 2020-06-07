const express = require('express');
const app = express();
const {mongoose} = require('./mongoDB');
const morgan = require('morgan');
const passport = require('passport');

//passaport middleware
require('./config/passaport-config')(passport);

//middleware
app.use(morgan('dev'));
app.use(express.json());
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//imports middleware
app.use(require('./util/imports'));

app.listen(3000 , err =>{
    if(err) throw err;
    console.log('LISTEN ON PORT 3000');
});