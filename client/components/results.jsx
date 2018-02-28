import React from 'react';
import RestaurantEntry from './restaurantentry.jsx';

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.restaurants = props.restaurants;
  }

  render() {
    return (
        <div>
          {this.restaurants.map(entry => {
              return <RestaurantEntry info={entry} />;
            })
          }
        </div>
      );
  }

}

export default Results;