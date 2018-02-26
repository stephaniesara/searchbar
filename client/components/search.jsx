import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.executeSearch = this.props.executeSearch;
    this.state = {};
  }

  componentDidMount() {
    var search = document.getElementById('search');
    console.log(search);
    console.log(typeof search);
    console.log(search.getElementsByTagName('input'));
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
    console.log(this.state);
    this.executeSearch(event);
    event.preventDefault();
  }

  render() {
    return (
        <form id="search" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            Name:
            <input type="text" name="name" value={this.state.name} />
            Cuisine:
            <input type="text" name="cuisine" value={this.state.cuisine} />
            City:
            <input type="text" name="city" value={this.state.city} />
            Price:
            <input type="checkbox" name="price" value={this.state.price} />
            Vegetarian:
            <input type="checkbox" name="vegetarian" value={this.state.vegetarian} />
            BYOB:
            <input type="checkbox" name="byob" value={this.state.byob} />
            <input type="submit" value="Find tables!" />
          </fieldset>
        </form>
      );
  }  

}

export default Search;