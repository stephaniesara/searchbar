import React from 'react';

const DatalistField = props => {

  const name = props.name.toLowerCase();

  return (
      <div>
        <label htmlFor={name}>{props.name}:</label>
        <input
          type="text" 
          list={`${name}-options`} 
          id={name} 
          className="query-field" 
        />
        <datalist id={`${name}-options`}>
          {props.options.map(option => <option value={option} />)}
        </datalist>
      </div>
    );

};

export default DatalistField;