import React from 'react';
import ShowStars from './showstars.jsx';
import style from '../styles.css';

const RestaurantEntry = props => {
  // console.log(props.info);
  // console.log();
  return (
      <div className={style.restaurantEntry}>
        <img 
          className={style.restaurantPhoto}
          src={'search/images/' + props.info.iterator + '.jpg'}
          alt={props.info.iterator}
        />
        <br/>
        <div className={style.restaurantDescription}>
          <div className={style.descriptionName}>{props.info.name}</div>
          <ShowStars stars={props.info.stars} />
          <div className={style.descriptionPrice}>{props.info.price}</div>
          <div className={style.descriptionCuisine}>{props.info.cuisine} | {props.info.neighborhood}</div>
        </div>
        <br/>
      </div>
    );
}

export default RestaurantEntry;