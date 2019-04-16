const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://hackthon:hackthon@cluster0-bdgux.mongodb.net/test?retryWrites=true';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  if (err) client.close();
  else
  {
    const db = client.db('test');
    db.collection('user').insertMany(
    [{
        user_email: 'Josh.@42.us.com',
        user_password: '55660',
        user_like: {
            like_restaurant_name: 'i-Tea',
            like_restaurant_addr: '34925 Newark Blvd',
            lide_restaurant_zip: '94560',
            like_restaurant_city: 'Newark',
            like_restaurant_genre: ['tea shop'],
            like_restaurant_number: '(510) 358-2682',
            like_restaurant_url: 'itea-usa.com'
        },
        user_coupon: ['add_1'],
        user_review: {
            review_user_name: 'Josh.@42.us.com',
            review_restaurant_name: 'i-Tea',
            review_service: false,
            review_food: true,
            review_speed: true,
            review_price: false,
            review_command:''
        }
    },
    {
        user_email: 'kitty.@gmail.com',
        user_password: '15660',
        user_like: {
            like_restaurant_name: 'Jack in the Box',
            like_restaurant_addr: '34701 Ardenwood',
            lide_restaurant_zip: '94555',
            like_restaurant_city: 'Fremont',
            like_restaurant_genre: ['fast food', 'breakfast'],
            like_restaurant_number: '(510) 796-5972',
            like_restaurant_url: 'locations.jackinthebox.com'
        },
        user_coupon: ['add_1'],
        user_review: {
            review_user_name: 'kitty.@gmail.com',
            review_restaurant_name: 'Venus Cafe',
            review_service: false,
            review_food: true,
            review_speed: false,
            review_price: false,
            review_command:''
        }
    },
    {
        user_email: 'Anny.@42.us.com',
        user_password: '55994',
        user_like: {
            like_restaurant_name: 'Venus Cafe',
            like_restaurant_addr: '6267 Jarvis Ave',
            lide_restaurant_zip: '94560',
            like_restaurant_city: 'Newark',
            like_restaurant_genre: ['Chinses','breakfast','cash only'],
            like_restaurant_number: '(510) 744-1188',
            like_restaurant_url: 'venuscafe-usa.com'
        },
        user_coupon: ['add_1'],
        user_review: {
            review_user_name: 'Anny.@42.us.com',
            review_restaurant_name: 'i-Tea',
            review_service: false,
            review_food: true,
            review_speed: true,
            review_price: true,
            review_command:''
        }
    }]);
  }
});

