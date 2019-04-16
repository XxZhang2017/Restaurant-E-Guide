const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://hackthon:hackthon@cluster0-bdgux.mongodb.net/test?retryWrites=true';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  if (err) client.close();
  else
  {
    const db = client.db('test');
    db.collection('restaurant').insertMany(
    [{
        restaurant_name: 'i-Tea',
        restaurant_addr: '34925 Newark Blvd',
        restaurant_city: 'Newark',
        restaurant_zip: '94560',
        restaurant_genre: ['tea shop'],
        restaurant_phone: '(510) 358-2682',
        restaurant_url: 'itea-usa.com', 
        restaurant_loc_x: '', 
        restaurant_loc_y: '',
        restaurant_review:{
            review_service: 3,
            review_food: 4,
            review_speed: 3,
            review_price: 2
            }
    },
    {
        restaurant_name: 'Venus Cafe',
        restaurant_addr: '6267 Jarvis Ave',
        restaurant_city: 'Newark',
        restaurant_zip: '94560',
        restaurant_genre: ['Chinses','breakfast','cash only'],
        restaurant_phone: '(510) 744-1188',
        restaurant_url: 'venuscafe-usa.com',
        restaurant_loc_x: '',
        restaurant_loc_y:  '',
        restaurant_review:{
            review_service: 3,
            review_food: 5,
            review_speed: 2,
            review_price: 4
            }
    },
    {
        restaurant_name: 'Jack in the Box',
        restaurant_addr: '34701 Ardenwood',
        restaurant_city: 'Fremont',
        restaurant_zip: '94555',
        restaurant_genre: ['fast food', 'breakfast'],
        restaurant_phone: '(510) 796-5972',
        restaurant_url: 'locations.jackinthebox.com',
        restaurant_loc_x: '',
        restaurant_loc_y: '',
        restaurant_review:{
            review_service: 3,
            review_food: 5,
            review_speed: 2,
            review_price: 4
            }
    }]);
  }
});

