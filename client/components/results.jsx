import React from 'react';
import RestaurantEntry from './restaurantentry.jsx';

class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering results');
    return (
        <div id="search-results">
          {this.props.restaurants.map(entry => {
              return <RestaurantEntry info={entry} />;
            })
          }
        </div>
      );
  }

}

export default Results;