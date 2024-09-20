//Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//GET /comments
app.get('/comments', function(req, res) {
    var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    res.json(comments);
});

//POST /comments
app.post('/comments', function(req, res) {
    var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    var newComment = req.body;
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(newComment);
});

//PUT /comments
app.put('/comments/:id', function(req, res) {
    var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    var id = req.params.id;
    var comment = req.body;
    comments[id] = comment;
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(comment);
});

//DELETE /comments
app.delete('/comments/:id', function(req, res) {
    var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    var id = req.params.id;
    comments.splice(id, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(true);
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
