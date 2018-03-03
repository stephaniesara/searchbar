import React from 'react';
import axios from 'axios';
import Search from './search.jsx';
import Results from './results.jsx';
import RestaurantEntry from './restaurantentry.jsx';


class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recommendations: props.stubdata,
      searchResults: undefined,
      showSearch: false,
      showSearchResults: false,
      searchButtonVal: 'Search restaurants'
    };
    this.getFieldValues('neighborhood');
    this.getFieldValues('cuisine');
  }

  getFieldValues(field) {
    axios.get(`search/restaurants/${field}`)
      .then(result => {
        this[field + 'Options'] = result.data.map(entry => entry[field]);
        console.log(this[field + 'Options']);
      })
      .catch(error => {
        console.log(`Cannot retrieve field: ${field}`);
      });
  }

  showSearch() {
    this.setState({
      showSearch: !this.state.showSearch,
      searchButtonVal: this.state.showSearch ? 'Search restaurants' : 'Hide search'
    });
  }

  executeSearch(searchParams) {
    axios({
        url: 'search/restaurants',
        method: 'post',
        data: searchParams
      })
      .then(result => {
        this.setState({
          searchResults: result.data,
          showSearchResults: true
        });
        console.log(this.state.searchResults);
      })
      .catch(err => {
        console.log('Error retrieving search results');
      });
  }

  renderSearch() {
    if (this.state.showSearch) {
      return (
          <Search 
            executeSearch={this.executeSearch.bind(this)} 
            neighborhoodOptions={this.neighborhoodOptions}
            cuisineOptions={this.cuisineOptions}
          />
        );
    }
  }

  renderRestaurants() {
    var restaurants = this.state.showSearchResults ?
      this.state.searchResults : this.state.recommendations;
    if (!restaurants.length) {
      return <div>No matching results</div>;
    } else {
      return (
          <Results
            restaurants={this.state.showSearchResults 
              ? this.state.searchResults 
              : this.state.recommendations}
          />
        );
    }
  }

  render() {
    return (
        <div id="sidebar">
          <button 
            id="showSearch"
            type="button"
            onClick={this.showSearch.bind(this)}
          >
          {this.state.searchButtonVal}
          </button>
          {this.renderSearch.call(this)}
          {this.renderRestaurants.call(this)}
        </div>
      )
  }

}

export default SideBar;