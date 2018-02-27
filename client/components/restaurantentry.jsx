import React from 'react';

const RestaurantEntry = props => {
  return (
      <div className="restaurantentry">
        {props.info.name}<br/>
        {props.info.cuisine}<br/>
        {props.info.price}
      </div>
    );
}

export default RestaurantEntry;