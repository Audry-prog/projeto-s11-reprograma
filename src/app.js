const express = require('express');
const app = express();

app.use(express.json());

const index = require('./routes/index');
const pets = require('./routes/petsRoute');

app.use('/', function (req, res, next) {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Origin', 'Origin, X-Requested-with, Content-Type, Accept')
    console.log('Nova requisição realizada');
    next()
})

app.use('/', index);
app.use('/pets', pets);

module.exports = app;