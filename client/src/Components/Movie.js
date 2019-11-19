import React from 'react';

let Movie = (props) => {

  return (
    <div>
      <span>{props.movie}</span>
      <input type="checkbox"></input>
    </div>

  )
}

export default Movie;