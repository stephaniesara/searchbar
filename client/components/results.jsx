import React from 'react';
import RestaurantEntry from './restaurantentry.jsx';
import style from '../styles.css';

const Results = props => {

  return (
        <div id={style.searchResults}>
          {props.restaurants.map(entry => {
              return <RestaurantEntry info={entry} />;
            })
          }
        </div>
    );

};

export default Results;