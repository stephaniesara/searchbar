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
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log(event.target.name.value);
    console.log(event.target.cuisine.value);
    console.log(event.target.byob.value);
    this.executeSearch(event);
    event.preventDefault();
  }

  render() {
    return (
        <form id="search" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />

            <label htmlFor="cuisine">Cuisine:</label>
            <input type="text" id="cuisine" />

            <label htmlFor="city">City:</label>
            <input type="text" id="city" />

            <label htmlFor="price">Price:</label>
            <input type="checkbox" id="price" />
            
            <label htmlFor="vegetarian">Vegetarian:</label>
            <input type="checkbox" id="vegetarian" />

            <label htmlFor="byob">BYOB:</label>
            <input type="checkbox" id="byob" />

            <label></label>
            <input type="submit" value="Find tables!" />
          </fieldset>
        </form>
      );
  }  

}

export default Search;