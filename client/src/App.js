import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/searchForm';
import Checkbox from './components/checkboxes';
import axios from 'axios'

const OPTIONS = ["One", "Two", "Three"];

class App extends Component {
  state = {
    venues: [],
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes, 
          [checkbox]: isSelected
        }
      }));
    });
  };


  selectAll = () => this.selectAllCheckboxes(true);
  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  
  // call get Venues
  componentDidMount() {
    this.getVenues();
  }

//map renderin function
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAAT6-dWLvHbxFocWvYgmdEifZGFTWr0lk&callback=initMap")
    window.initMap = this.initMap;
  }
  // gets information by foursquare api
  getVenues = () => {

    // getting venues from API
    // retrieving information from API renders the map
    axios.get("http://localhost:5000/restaurants/", { useNewUrlParser: true})
      .then(response => {
        this.setState({
          venues: response.data
        }, this.renderMap())
      })
      .catch(error => {
        console.log(error)
      });   
    // fetch("http://localhost:5000/restaurants/",{'mode': 'no-cors'})
    //     .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         items: result.name
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       });   
    //     });
  }
  initMap = () => {
    // coordinates and zoom for map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:  37.529659, lng: -122.040237},
      zoom: 13.5,
      mapTypeControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });

    // creates variable infowindow
    var infowindow = new window.google.maps.InfoWindow()

    //
    this.state.venues.map(myVenue => {
      // sets content string into venue
      var contentString = "<p>" + myVenue.name + "</p>" + "<p>" + myVenue.address + "</p>" 
      function searchingFor(term){
        return function(x){
          console.log(myVenue.location)
          return myVenue;
        }
      }
      //sets the marker in the position
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.location.lat , lng: myVenue.location.lng},
        map: map,
        title: myVenue.name
      })
      // ads a listener to marker where clicking will bring 
      // up infowindow
      // sets the content of infowindow then opens it
      marker.addListener('click', function(){

        infowindow.setContent(contentString)
        infowindow.open(map, marker)
      })

    });
    
  }
  //render map in html
  render() {
    return (
      <main>
        <div className="container">
          <div id = "search">
            <p>URMenu</p>
            <SearchForm></SearchForm>
          </div>
          <div id="check-boxes">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
            </form>
          </div>
        </div>
        <div id="map"> </div>
      </main>
    );
  }
}


function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script,index);
}

export default App;
