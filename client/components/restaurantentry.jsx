import React from 'react';

const RestaurantEntry = props => {
  return (
      <div className="restaurant-entry">
        <div className="proportions"></div>
        <img 
          className="restaurant-photo"
          src={'search/images/' + props.info.iterator + '.jpg'}
          alt={props.info.iterator}
        />
        <br/>
        <div className="restaurant-description">
          {props.info.name}<br/>
          {props.info.price}<br/>
          {props.info.cuisine} | {props.info.neighborhood}
        </div>
      </div>
    );
}

export default RestaurantEntry;