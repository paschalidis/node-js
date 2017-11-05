var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

// Set up teplate egine
app.set('view engine', 'ets');

// Static files
app.use(express.static('./public'));

// Fire Controllers
todoController(app);