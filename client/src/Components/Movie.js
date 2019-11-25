import React from 'react';

class Movie extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      hasWatched: false
    }

    this.handleToggleWatched = this.handleToggleWatched.bind(this);
  }

  handleToggleWatched(event) {
    let title = event.target.getAttribute('name');
    this.setState((state)=> {
      state.hasWatched= !(state.hasWatched)
      return state;
    }, ()=> {
      this.props.handleToggleWatched(title);
      console.log('movie.js: ', this.state)
    })

  }


  render() {
    let watchStatus = this.state.hasWatched;
    let displayedText;

    if (watchStatus === true) {
      displayedText = <div name={this.props.movie} className="Watched" onClick={this.handleToggleWatched}>Watched</div>
    } else {
      displayedText = <div name={this.props.movie}className="Not-Watched" onClick={this.handleToggleWatched}>Not Watched</div>
    }

    return (
      <div className="movie-container">
        <div className="movie">{this.props.movie}</div>
        <div>IMDB Rating: {this.props.imdbRating}</div>
        <div>Metascore: {this.props.metascore}</div>
        <div>Runtime: {this.props.runtime}</div>
        <div>Year: {this.props.year}</div>
        {displayedText}
      </div>
    )
  }
}

export default Movie;