import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.search = this.props.search;
  }

  componentDidMount() {
    const search = document.getElementById('search');
    search.getElementsByTagName('input').forEach(input => {
      input.addEventListener('change', this.handleChange);
    });
  }

  handleChange() {
    
  }

  handleSubmit(event) {
    this.search();
    event.preventDefault();
  }

  render() {
    return (
        <form id="search" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            Name:
            <input type="text" name="name" />
            Cuisine:
            <input type="text" name="cuisine" />
            City:
            <input type="text" name="city" />
            Price:
            <input type="checkbox" name="price" />
            Vegetarian:
            <input type="checkbox" name="vegetarian" />
            BYOB:
            <input type="checkbox" name="byob" />
            <input type="submit" val="Find tables!" />
          </fieldset>
        </form>
      );
  }  

}

export default Search;