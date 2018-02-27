import React from 'react';
import Search from './search.jsx';
import Recommended from './recommended.jsx';
import Results from './results.jsx';
import RestaurantEntry from './restaurantentry.jsx';


class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      searchButtonVal: 'Search restaurants'
    };
    //http req for first 5 recommended restaurants
  }

  showSearch() {
    this.setState({
      showSearch: !this.state.showSearch,
      searchButtonVal: this.state.showSearch ? 'Search restaurants' : 'Hide search'
    });
  }

  executeSearch(searchState) {
    var search = document.getElementById('search');
    console.log(searchState);
    console.log(search.$.checked);
    console.log(search.$$.checked);
    console.log('Search executed!');
  }

  renderSearch() {
    if (this.state.showSearch) {
      return <Search executeSearch={this.executeSearch.bind(this)} />;
    }
  }

  renderRestaurants() {
    if (this.state.showSearch) {
      return <Results />;
    } else {
      return <Recommended />;
    }
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
        </div>
      )
  }

}

export default SideBar;