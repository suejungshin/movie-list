import React from 'react';
import MovieList from './MovieList.js';

class App extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      movies: [{title: 'Mean Girls'},
      {title: 'Hackers'},
      {title: 'The Grey'},
      {title: 'Sunshine'},
      {title: 'Ex Machina'},],
    }
  }

  render () {
    return (
      <div>
        <div>Movie List!</div>
        <MovieList movies={this.state.movies}></MovieList>
      </div>
    )
  }

}

export default App;