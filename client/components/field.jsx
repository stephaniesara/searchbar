import React from 'react';
import style from '../styles.css';

const Field = props => {
  
  return (
      <div className={style.queryFieldContainer}>
        <div className={style.queryField}>
          <label htmlFor={props.name.toLowerCase()}>{props.name}:</label>
          <input type={props.type} name={props.name.toLowerCase()} className="input-field" />
        </div>
      </div>
    );

};

export default Field;