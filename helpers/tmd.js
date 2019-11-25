const request = require('request');
const config = require('../config.js')

let getMovies = (movie, callback) => {

  console.log(movie)
  let formattedMovieTitle = movie.replace(" ", "+");

  const options = {
    url: `https://api.themoviedb.org/3/search/movie?api_key=${config.TOKEN}&query=${formattedMovieTitle}`,
    headers: {
      'User-Agent': 'request'
    }
  }
  request(options, (error, response, body) => {
    //console.log(error);
    //console.log(response);
    console.log(body);
   // console.log(JSON.parse(body))
    callback(error, body)

  })
}

let getMovieDetails = (movieID, callback) => {

  const options = {
    url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=${config.TOKEN}&append_to_response=videos`,
    headers: {
      'User-Agent': 'request'
    }
  }
  request(options, (error, response, body) => {
    callback(error, body)
  })
}


//getMovies("John Wick");

module.exports.getMovies = getMovies;
module.exports.getMovieDetails = getMovieDetails;
