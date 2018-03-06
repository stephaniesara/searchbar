import React from 'react';
import ReactStars from 'react-stars';

const ShowStars = props => {

  return (
      <ReactStars
        count={5}
        onChange={() => console.log('changed LOL')}
        size={24}
        color2={'#ffd700'} 
      />
    );

}

export default ShowStars;