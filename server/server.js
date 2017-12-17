var express = require('express');
var bodyParser = require('body-parser');

var {mongoose}  = require('./db/mongoose');
var {Todo}  = require('./models/todo');
var {User}  = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',  (req, res)  =>  {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>  {
    res.send(doc);
  },  (e) =>  {
    res.status(400).send(e);
  });
});

//GET /todos/123afafasdf

app.listen(3000, ()  =>  {
  console.log('Started on port 3000');
});

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc)  =>  {
//   console.log('Save todo',  doc);
// },  (e) =>  {
//   console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//   text: 'Something to do'
//   /*
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 123
// */});

// otherTodo.save().then((doc)  =>  {
//   console.log(JSON.stringify(doc, undefined, 2));
// },  (e) =>  {
//   console.log('Unable to save todo', e);
// });


//
//
// var user = new User({
//   email: 'nose@gmail.com'/*,
//   password: 'nothing'*/
// });
//
// user.save().then((doc)  =>  {
//   console.log(JSON.stringify(doc, undefined, 2));
// },  (e) =>  {
//   console.log('Unable to save todo', e);
// });

//  User model email, password
//  email set up  require it  - trim it - set type  - set min length of 1
