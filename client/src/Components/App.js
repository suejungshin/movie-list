import React from 'react';
import MovieList from './MovieList.js';
import Form from './Form.js';
import Movies from './Movies.js';

class App extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      movies: [],
      searchResultFound: true
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
  }

  handleSearch(input) {
    const searchResults = [];
    this.state.movies.forEach((movie)=>{
      let titleLowerCase = movie.title.toLowerCase();
      let inputLowerCase = input.toLowerCase();
      if (titleLowerCase.includes(inputLowerCase)) {
        searchResults.push(movie)
      }
    })
    if (searchResults.length === 0) {
      this.setState({searchResultFound: false})
    } else {
      this.setState({movies: searchResults, searchResultFound: true})
    }
  }

  handleAddMovie(input) {
    this.setState({movies: this.state.movies.concat({title: input})});
  }

  render() {
    const searchResultFound = this.state.searchResultFound;
    let MovieListDisplayed;
    if (searchResultFound) {
      MovieListDisplayed = <MovieList movies={this.state.movies}></MovieList>
    } else {
      MovieListDisplayed = <div>No results found</div>
    }

    return (
      <div>
        <div>Movie List!</div>
        <Form handleSearch={this.handleSearch} handleAddMovie={this.handleAddMovie}></Form>
        {MovieListDisplayed}
      </div>
    )
  }

}

export default App;