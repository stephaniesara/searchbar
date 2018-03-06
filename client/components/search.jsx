import React from 'react';
import Field from './field.jsx';
import DatalistField from './datalistfield.jsx';
import style from '../styles.css';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.executeSearch = this.props.executeSearch;
    this.state = {};
    this.checkboxFields = ['Vegetarian', 'BYOB'];
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var search = document.getElementById(style.search);
    Array.from(search.getElementsByClassName(style.inputField)).forEach(el => {
      el.addEventListener('change', this.handleChange);
    });
  }

  handleChange(event) {
    var input = event.target;
    var val = input.type === 'checkbox' ? input.checked : input.value;
    this.setState({
      [input.name]: val
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.executeSearch(this.state);
  }

  render() {
    return (
        <form id={style.search} onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <Field type='text' name="Name" />
            {Object.entries(this.props.fields).map(entry => {
                return <DatalistField name={entry[0]} options={entry[1]} />;
              })}
            <div className={style.queryFieldContainer}>
              <div className={style.queryField}>
                <label>Price:</label>
                {['$', '$$', '$$$', '$$$$'].map(price => {
                    return (
                        <span>
                          <label htmlFor={price}>{price}</label>
                          <input type="checkbox" name={price} className={style.inputField} />
                        </span>
                      );
                  })}
              </div>
            </div>
            {this.checkboxFields.map(field => {
                return <Field type='checkbox' name={field} />;
              })} 
            <label></label>
            <input type="submit" value="Find restaurants!" id={style.searchRestaurants} />
          </fieldset>
        </form>
      );
  }  

}

export default Search;