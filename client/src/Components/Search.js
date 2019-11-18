import React from 'react';

class Search extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      searchInput: ''
    }
    this.handleTextboxChange = this.handleTextboxChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleTextboxChange(event) {
    this.setState({
      searchInput: event.target.value
    })
  }

  handleSearchSubmit() {
    this.props.handleSearch(this.state.searchInput);
  }

  render() {

    return (
      <div>
        <input onChange={this.handleTextboxChange}></input>
        <button onClick={this.handleSearchSubmit}>Search</button>
      </div>

    )
  }

}

export default Search;