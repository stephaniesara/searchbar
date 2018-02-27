import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.executeSearch = this.props.executeSearch;
    this.state = {};
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
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" />
            </div>
            <div>
              <label htmlFor="cuisine">Cuisine:</label>
              <input type="text" id="cuisine" />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input type="text" id="city" />
            </div>
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
            <div>
              <label htmlFor="vegetarian">Vegetarian:</label>
              <input type="checkbox" id="vegetarian" />
            </div>
            <div>
              <label htmlFor="byob">BYOB:</label>
              <input type="checkbox" id="byob" />
            </div>
            <label></label>
            <input type="submit" value="Find tables!" />
          </fieldset>
        </form>
      );
  }  

}

export default Search;