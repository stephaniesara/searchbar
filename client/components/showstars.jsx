import React from 'react';
import ReactStars from 'react-stars';
import ReactStarRatings from 'react-star-ratings';

const ShowStars = props => {

  return (
      <ReactStarRatings
        rating={props.stars}
        starRatedColor="red"
        starDimension="20px"
        numberOfStars={5}
        starSpacing="2px"
      />
    );

}

export default ShowStars;

// <ReactStars
//         count={props.stars}
//         onChange={() => console.log('changed LOL')}
//         size={24}
//         color2={'#ffd700'}
//       />