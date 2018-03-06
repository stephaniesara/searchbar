import React from 'react';

const DatalistField = props => {

  const name = props.name.toLowerCase();

  return (
      <div className="query-field-container">
        <div className="query-field">
          <label htmlFor={name}>{props.name}:</label>
          <input
            type="text" 
            list={`${name}-options`} 
            id={name} 
            className="input-field"
          />
          <datalist id={`${name}-options`}>
            {props.options.map(option => <option value={option} />)}
          </datalist>
        </div>
      </div>
    );

};

export default DatalistField;