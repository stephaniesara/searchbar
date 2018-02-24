import React from 'react';
import Search from './search.jsx';
import Recommended from './recommended.jsx';
import Results from './results.jsx';


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
      searchButtonVal: this.state.showSearch ? 'Hide search' : 'Search restaurants'
    })
  }

  renderSearch() {
    if (this.state.showSearch) {
      return renderFullSearchBar();
    }
  }

  renderFullSearchBar() {
    return (
        <Name />
        <Cuisine />
        <City
      )
  }

  render() {
    return (
        <div>
          <button 
            id="search"
            type="button"
            onclick={this.showSearch.bind(this)}>
            {this.state.searchButtonVal}
          </button>
          <Recommended />
        </div>
      )
  }

}

export default SideBar;