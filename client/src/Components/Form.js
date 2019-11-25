import React from 'react';

class Form extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      addMovieInput: '',
      searchInput: ''
    }
    this.handleTextboxChange = this.handleTextboxChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
  }

  handleTextboxChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSearchSubmit() {
    this.props.handleSearch(this.state.searchInput);
  }

  handleAddMovie() {
    this.props.handleAddMovie(this.state.addMovieInput);
  }

  render() {

    return (
      <div className="form-container">
        <input name="addMovieInput" onChange={this.handleTextboxChange}></input>
        <button name="add-movie-button" onClick={this.handleAddMovie}>Add</button>

        <input name="searchInput" onChange={this.handleTextboxChange}></input>
        <button name="search-bar-submit" onClick={this.handleSearchSubmit}>Search</button>
      </div>

    )
  }

}

export default Form;