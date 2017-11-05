var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Content to database
mongoose.connect('<Your connection to mongo db>');

// Create a schema - blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// Create model
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        // Get data from mongoDB
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // Get Data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // Delete the requested item from monodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
};