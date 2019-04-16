const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://hackthon:hackthon@cluster0-bdgux.mongodb.net/test?retryWrites=true';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  if (err) client.close();
  else
  {
    const db = client.db('test');
    const cursor = db.collection('restaurant').find({
        restaurant_genre: {$all:['tea shop']}
      }).forEach(function(data){
          console.log(data.restaurant_name);
      }) 
  }
});