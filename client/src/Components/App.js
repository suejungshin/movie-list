import React from 'react';
import MovieList from './MovieList.js';
import Form from './Form.js';
import Movies from './Movies.js';
import Header from './Header.js';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: Movies,
      watchedMovies: [],
      notWatchedMovies: [],
      searchResultFound: true
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleToggleWatched = this.handleToggleWatched.bind(this);
    this.handleWatchViewClick = this.handleWatchViewClick.bind(this);
    this.handleNotWatchViewClick = this.handleNotWatchViewClick.bind(this);
    this.postMovieToDB = this.postMovieToDB.bind(this);
    this.getDetailedMovieData = this.getDetailedMovieData.bind(this);
  }

  componentDidMount() {
    this.state.movies.forEach((movie) => {
      this.postMovieToDB(movie.title)
    })
  }

  postMovieToDB(movie) {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/movies',
      data: { movie: movie },
      success: (result) => {

        let movieInfo = JSON.parse(result)
        //console.log(movieInfo)
        let firstHit = movieInfo.results[0];

        this.setState((state) => {
          state.movies.forEach((stateMovie) => {
            if (stateMovie.title === movie) {
              stateMovie.id = firstHit.id,
                stateMovie.year = firstHit.release_date,
                stateMovie.runtime = 'placeholder',
                stateMovie.metascore = 'placeholder',
                stateMovie.imdbRating = firstHit.vote_average
            }
          })
          return state;
        })

        // console.log(fullMovie)
        this.getDetailedMovieData(firstHit.id)
      }
    })
  }


  getDetailedMovieData(movieID) {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/movies?movieID=${movieID}`,
      success: (data) => {
     //   console.log('querydata:', JSON.parse(data))
        let fullMovieDetails = JSON.parse(data);
        this.setState( (state) => {
          const updatedMovies = [];

          state.movies.forEach((stateMovie) => {
            if (stateMovie.title === fullMovieDetails.original_title) {
              const updatedMovie = {...stateMovie};
              updatedMovie.runtime = fullMovieDetails.runtime;
              updatedMovie.metascore = fullMovieDetails.popularity;
              updatedMovies.push(updatedMovie)
            } else {
              updatedMovies.push(stateMovie);
            }
          })

          return { movies: updatedMovies };
        })
      //  console.log(this.state.movies)
      }
    })
  }


  handleAddMovie(input) {
    let newArray = this.state.movies.concat({
      title: input,
      hasWatched: false
    });

    this.setState({
      movies: newArray
    });
    this.postMovieToDB(input)
  }

  handleToggleWatched(clickedMovieTitle) {
    let moviesArr = this.state.movies;
    for (let i = 0; i < moviesArr.length; i++) {
      if (moviesArr[i].title === clickedMovieTitle) {
        this.setState((state) => {
          state.movies[i].hasWatched = !(state.movies[i].hasWatched)
          return state;
        })
      }
    }

  }

  handleWatchViewClick(event) {
    const watchedMovies = this.state.watchedMovies;
    this.state.movies.forEach((movie) => {
      if (movie.hasWatched) {
        watchedMovies.push(movie)
      }
    })
    this.setState({ movies: watchedMovies })
    console.log('clickwatchviewWatched: ', this.state)
  }

  handleNotWatchViewClick(event) {
    const notWatchedMovies = this.state.notWatchedMovies;
    this.state.movies.forEach((movie) => {
      if (!(movie.hasWatched)) {
        notWatchedMovies.push(movie)
      }
    })
    this.setState({ movies: notWatchedMovies })
    console.log('clickwatchviewNotWatched: ', this.state)
  }

  handleSearch(input) {
    const searchResults = [];
    this.state.movies.forEach((movie) => {
      let titleLowerCase = movie.title.toLowerCase();
      let inputLowerCase = input.toLowerCase();
      if (titleLowerCase.includes(inputLowerCase)) {
        searchResults.push(movie)
      }
    })
    if (searchResults.length === 0) {
      this.setState({ searchResultFound: false })
    } else {
      this.setState({ movies: searchResults, searchResultFound: true })
    }
  }

  render() {
    const searchResultFound = this.state.searchResultFound;
    let MovieListDisplayed;
    if (searchResultFound) {
      MovieListDisplayed = <MovieList movies={this.state.movies} handleToggleWatched={this.handleToggleWatched}></MovieList>
    } else {
      MovieListDisplayed = <div>No results found</div>
    }

    console.log(this.state)
    return (
      <div className="app-box">
        <Header ></Header>
        <Form handleSearch={this.handleSearch} handleAddMovie={this.handleAddMovie}></Form>
        <button name="Watched" onClick={this.handleWatchViewClick}>See Watched Movies</button>
        <button name="Not-Watched" onClick={this.handleNotWatchViewClick}>See Not-Watched Movies</button>
        {MovieListDisplayed}
      </div>
    )
  }
}


export default App;