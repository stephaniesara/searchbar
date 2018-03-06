import React from 'react';
import Field from './field.jsx';
import DatalistField from './datalistfield.jsx';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.executeSearch = this.props.executeSearch;
    this.state = {};
    this.checkboxFields = ['Vegetarian', 'BYOB'];
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var search = document.getElementById('search');
    Array.from(search.getElementsByClassName('input-field')).forEach(el => {
      el.addEventListener('change', this.handleChange);
    });
  }

  handleChange(event) {
    var input = event.target;
    var val = input.type === 'checkbox' ? input.checked : input.value;
    this.setState({
      [input.id]: val
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.executeSearch(this.state);
  }

  render() {
    return (
        <form id="search" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <Field type='text' name="Name" />
            {Object.entries(this.props.fields).map(entry => {
                return <DatalistField name={entry[0]} options={entry[1]} />;
              })}
            <div className="query-field-container">
              <div className="query-field">
                <label>Price:</label>
                {['$', '$$', '$$$', '$$$$'].map(price => {
                    return (
                        <span>
                          <label htmlFor={price}>{price}</label>
                          <input type="checkbox" id={price} className="query-field" />
                        </span>
                      );
                  })}
              </div>
            </div>
            {this.checkboxFields.map(field => {
                return <Field type='checkbox' name={field} />;
              })} 
            <label></label>
            <input type="submit" value="Find restaurants!" id="search-restaurants" />
          </fieldset>
        </form>
      );
  }  

}

export default Search;