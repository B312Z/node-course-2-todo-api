//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',  (err, db)  =>  {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID ('5a35c8aa9cff7d9dc39d20d2')
  // },  {
  //   $set: {
  //     completed: true
  //   }
  // },  {
  //   returnOriginal: false
  // }).then((result)  =>  {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID ('5a32286631d6c439d6bb3d98')
  },  {
    $set: {
      name: 'Brian'
    },
    $inc: {
      age: 1
    }
  },  {
    returnOriginal: false
  }).then((result)  =>  {
    console.log(result);
  });

  // db.close();

 });
