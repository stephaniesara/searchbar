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
          <div className="description-name">{props.info.name}</div>
          <div className="description-price">{props.info.price}</div>
          <div className="description-cuisine">{props.info.cuisine} | {props.info.neighborhood}</div>
        </div>
        <br/>
      </div>
    );
}

export default RestaurantEntry;