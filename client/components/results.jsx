import React from 'react';
import RestaurantEntry from './restaurantentry.jsx';
import style from '../styles.css';

class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id={style.searchResults}>
          {this.props.restaurants.map(entry => {
              return <RestaurantEntry info={entry} />;
            })
          }
        </div>
      );
  }

}

export default Results;