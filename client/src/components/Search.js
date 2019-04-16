import React, { Component } from 'react'
import axios from 'axios'
import ResultList from './ResultList.js'

// const { API_KEY } = process.env
const API_URL = 'https://restcountries.eu/rest/v2/name'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get(`${API_URL}/${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          results: data.data
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

 render() {
   return (
     <form >
       <input id="searchbox"
         placeholder="Find your favorite food..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
       />
       {/* <p>{this.state.query}</p> */}
     </form>
   )
 }
}

export default Search
