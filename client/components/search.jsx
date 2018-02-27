import React from 'react';
import Field from './field.jsx';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.executeSearch = this.props.executeSearch;
    this.state = {};
    this.stringFields = ['Name', 'Cuisine', 'City']; 
    this.checkboxFields = ['Vegetarian', 'BYOB'];
  }

  componentDidMount() {
    var search = document.getElementById('search');
    Array.from(search.getElementsByTagName('input')).forEach(el => {
      el.addEventListener('change', this.handleChange.bind(this));
    });
  }

  handleChange(event) {
    var input = event.target;
    var val = input.type === 'checkbox' ? input.checked : input.value;
    this.setState({
      [input.id]: val
    });
  }

  handleSubmit(event) {
    this.executeSearch(this.state);
    event.preventDefault();
  }

  render() {
    return (
        <form id="search" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            {this.stringFields.map(field => {
                return <Field
                    type="text"
                    name={field}
                  />; 
              })
            }
            <div>
              <label>Price:</label>
              {['$', '$$', '$$$', '$$$$'].map(price => {
                  return (
                      <span>
                        <label htmlFor={price}>{price}</label>
                        <input type="checkbox" id={price} />
                      </span>
                    );
                })
              }
            </div>
            {this.checkboxFields.map(field => {
                return <Field
                    type="checkbox"
                    name={field}
                  />;
              })
            } 
            <label></label>
            <input type="submit" value="Find tables!" />
          </fieldset>
        </form>
      );
  }  

}

export default Search;