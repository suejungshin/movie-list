import React from 'react';
import Movie from './Movie.js';
import Movies from './Movies.js';

class MovieList extends React.Component {
  constructor (props) {
    super (props)

  }

  render () {
    return (
      <div>
        {this.props.movies.map((movie)=> {
          return <Movie movie={movie.title} key={movie.title} handleToggleWatched={this.props.handleToggleWatched} imdbRating={movie.imdbRating} metascore={movie.metascore} runtime={movie.runtime} year={movie.year} ></Movie>
        })}
      </div>
    )
  }

}

export default MovieList;