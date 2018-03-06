import React from 'react';

const Field = props => {

  return (
      <div className="query-field-container">
        <div className="query-field">
          <label htmlFor={props.name.toLowerCase()}>{props.name}:</label>
          <input type={props.type} id={props.name.toLowerCase()} className="input-field" />
        </div>
      </div>
    );

};

export default Field;