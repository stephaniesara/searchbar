import React from 'react';

const RestaurantEntry = props => {
  return (
      <div className="restaurant-entry">
        <img src={'search/images/' + props.info.iterator + '.jpg'} alt={props.info.iterator} />
        {props.info.name}<br/>
        {props.info.cuisine}<br/>
        {props.info.price}
      </div>
    );
}

export default RestaurantEntry;