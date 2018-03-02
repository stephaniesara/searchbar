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
  }

  showSearch() {
    this.setState({
      showSearch: !this.state.showSearch,
      searchButtonVal: this.state.showSearch ? 'Search restaurants' : 'Hide search'
    });
  }

  executeSearch(searchState) {
    axios({
        url: 'search/restaurants',
        method: 'post',
        data: searchState
      })
      .then(result => {
        this.setState({
          searchResults: result.data,
          showSearchResults: true
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log('Error retrieving search results');
      });
  }

  renderSearch() {
    if (this.state.showSearch) {
      return <Search executeSearch={this.executeSearch.bind(this)} />;
    }
  }

  renderRestaurants() {
    return (
        <Results
          restaurants={this.state.showSearchResults 
            ? this.state.searchResults 
            : this.state.recommendations}
        />
      );
  }

  render() {
    return (
        <div>
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