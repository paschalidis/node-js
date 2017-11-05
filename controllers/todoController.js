var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Content to database
mongoose.connect('');

// Create a schema - blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// Create model
var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('Item saved');
});

var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding add'}];

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};