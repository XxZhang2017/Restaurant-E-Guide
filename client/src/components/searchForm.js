import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import axios from 'axios'
import { isNullOrUndefined } from 'util';




function searchingFor(term){


   return function(x){
        return x.name.toLowerCase().includes(term.toLowerCase()) ||
        !term;
   }
}

function MenuList(menu) {
    if(menu.vegan != NaN || menu.vegan != null || menu.vegan != undefined
        || menu.vegetarian != NaN || menu.vegetarian != null || menu.vegetarian != undefined
        ) 
        
    {

    
   return (
       <ul>
       
       {
           menu.vegan.map((item, i) =>
               {
                   return  (
                       <li key={i}> {item.name} - {item.price} </li>
                       )
               }
           )
       
       }
       {
            menu.vegetarian.map((item, i) =>
            {
                return  (
                    <li key={i}> {item.name} - {item.price} </li>
                    )
            }
        )
    
       }

    }
    </ul> 
   );
    }
}

class SearchForm extends Component {
   
    

   constructor(props) {
       super(props);
        var venuesList = []
       

       this.state = {
        venues: [],
        term: ''
       }

       axios.get("http://localhost:5000/restaurants/")
        .then(response => {
            this.setState(
                {
                    venues: response.data
                })
        })
        .catch(error => {
            console.log(error)
        });   
       this.searchHandler = this.searchHandler.bind(this);

 }

   searchHandler(event) {

       this.setState({ term: event.target.value });

       
        // .then(console.log(venues)); 
   }

   

   render() {
       const {term, venues} = this.state
//change <form> to <form onSubmit={this.handleSubmit}>
       return (
        <div>
        <form>
            <input type="text" name="search" id="searchbox" placeholder="Find your favorite food..." onChange= {this.searchHandler} value = {term} />
            <button>Find Food!</button>
        </form>
        <div id = "restaurant_box_a">
        {
            venues.filter(searchingFor(this.state.term)).map(venue =>
                <div id = "restaurant_box_b">
                    <ul>
                    
                    <li className="button" id="venue_name">{venue.name} </li>
                    <li id="venue_addr"> {venue.address}</li>
                    </ul>
               </div>
            )
        }
        </div>
    </div>

       );
   }
}

export default SearchForm