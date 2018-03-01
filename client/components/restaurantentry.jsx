import React from 'react';

const RestaurantEntry = props => {
  return (
      <div className="restaurant-entry">
        <img 
          className="restaurant-photo"
          src={'search/images/' + props.info.iterator + '.jpg'}
          alt={props.info.iterator} 
        /><br/>
        {props.info.name}<br/>
        {props.info.cuisine}<br/>
        {props.info.price}
      </div>
    );
}

export default RestaurantEntry;