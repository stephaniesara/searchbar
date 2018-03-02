import React from 'react';

const Field = props => {

  return (
      <div>
        <label htmlFor={props.name.toLowerCase()}>{props.name}:</label>
        <input type={props.type} id={props.name.toLowerCase()} className="query-field" />
      </div>
    );

};

export default Field;