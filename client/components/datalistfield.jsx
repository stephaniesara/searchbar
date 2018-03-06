import React from 'react';
import style from '../styles.css';

const DatalistField = props => {

  const name = props.name.toLowerCase();

  return (
      <div className={style.queryFieldContainer}>
        <div className={style.queryField}>
          <label htmlFor={name}>{props.name}:</label>
          <input
            type="text" 
            list={`search-${name}-options`} 
            name={name} 
            className={style.inputField}
          />
          <datalist id={`search-${name}-options`}>
            {props.options.map(option => <option value={option} />)}
          </datalist>
        </div>
      </div>
    );

};

export default DatalistField;