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
        {this.props.movies.map((movie, key)=> {
          return <Movie movie={movie.title} key={key}></Movie>
        })}
      </div>
    )
  }

}

export default MovieList;