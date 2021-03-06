require('./config/config.js');

const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID}  = require('mongodb');

var {mongoose}  = require('./db/mongoose');
var {Todo}  = require('./models/todo');
var {User}  = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos',  (req, res)  =>  {
  Todo.find().then((todos)  =>  {
    res.send({todos});
  }, (e)  =>  {
    res.status(400).send(e);
  })
});

///

///

// GET /todos/1234324
app.get('/todos/:id',  (req, res)  =>  {
  var id =  req.params.id;
//  res.send(req.params);

  if(!ObjectID.isValid(id)) {
    return  res.status(404).send();
  }

  Todo.findById(id).then((todo) =>  {
    if (!todo) {
      return  res.status(404).send();
    }

    res.send({todo});
  }).catch((e)  =>  {
    res.status(400).send();
  });
});

app.delete('/todos/:id',  (req, res)  =>  {
  var id =  req.params.id;
  if(!ObjectID.isValid(id)) {
    return  res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) =>  {
    if (!todo) {
      return  res.status(404).send();
    }

    res.send({todo});
  }).catch((e)  =>  {
    res.status(400).send();
  });



  //validate
});

app.patch('/todos/:id', (req, res)  =>{
  var id  = req.params.id;
  var body =  _.pick(req.body,  ['text',  'completed']);

  if(!ObjectID.isValid(id)) {
    return  res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,  {$set: body}, {new: true}).then((todo)  =>  {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e)  =>  {
    res.status(400).send();
  });
});

app.listen(port/*3000*/, ()  =>  {
  console.log(`Started up at port ${port}`);
});

module.exports  = {app};
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
