module.exports = function(app){
    
    app.get('/todo', function(req, res){
        console.log(req.url);
        res.render('todo');
    });

    app.post('/todo', function(req, res){
        
    });

    app.delete('/todo', function(req, res){

    });
};