import React from 'react';
import MovieList from './MovieList.js';
import Search from './Search.js';
import Movies from './Movies.js';

class App extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      movies: Movies,
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(input) {
    const searchResults = [];
    Movies.forEach((movie)=>{
      let titleLowerCase = movie.title.toLowerCase();
      let inputLowerCase = input.toLowerCase();
      if (titleLowerCase.includes(inputLowerCase)) {
        searchResults.push(movie)
      }
    })
    if (searchResults.length === 0) {
      alert("No movies by that title found")
    } else {
      this.setState({movies: searchResults})
    }
  }

  render () {
    return (
      <div>
        <div>Movie List!</div>
        <Search handleSearch={this.handleSearch}></Search>
        <MovieList movies={this.state.movies}></MovieList>
      </div>
    )
  }

}

export default App;