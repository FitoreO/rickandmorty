import React, { Component } from "react";
import Modal from "./components/Modal/Modal";
import "./App.css";
const sortBy = require("sort-by");

function getImageForShow(id) {
  return `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;
}

// function getLocationForShow()
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(25));
}

let sida = getRandomInt();
// console.log(sida);

const API = `https://rickandmortyapi.com/api/character/?page=${sida}`;

// function getIdFromUrl(url) {
//   return url.split("/")[6];
// }

function getDate(date) {
  date = date.slice(0, 4);
  switch (date) {
    case "2017":
      date = "2 years ago";
      break;
    default:
      break;
  }
  return date;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      sortBy: "name",
      filter: "",
      search: "",
      isShowing: false,
      selectedCharacterId: ""
    };
  }

  openModalHandler = id => {
    this.setState({
      isShowing: true,
      selectedCharacterId: id
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  handleSort(field, event) {
    event.preventDefault();
    this.setState({
      sortBy: field
    });
  }

  handleSearch() {
    this.setState({
      search: this.refs.addInput.value
    });
  }

  componentDidMount() {
    this.populateAppWithData();
  }

  populateAppWithData() {
    const showData = fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }));
    return showData;
  }
  render() {
    const results = this.state.results
      .slice()
      .sort(sortBy(this.state.sortBy))
      .filter(
        result =>
          this.state.search === ""
            ? result
            : result.name.startsWith(this.state.search)
        // !this.state.search ? true : result.name === this.state.search
      )
      .map((result, index) => (
        <ul
          onClick={this.openModalHandler.bind(this, result.id)}
          key={"result" + index}
        >
          <li className="outerList">
            <p>
              {""}
              <p>Name: {result.name}</p> ID: {result.id} - Created:{" "}
              {getDate(result.created)}
              {/* <p>ID: {result.id}</p> */}
              <img src={getImageForShow(result.id)} /> {""}
            </p>
            <p>Status: {result.status}</p>
            <p>Species: {result.species}</p>
            <p>Gender: {result.gender}</p>
            <p>Origin: {result.origin.name}</p>
            <p>Last location: {result.location.name}</p>
            {result.episode.name}
            {/* {result.episode.map((episode, index) => {
              return (
                <p className="innerList" key={"episode" + index}>
                  {episode}
                </p>
              );
            })} */}
          </li>
        </ul>
      ));

    const selectedCharacter = this.state.results.find(
      character => character.id === this.state.selectedCharacterId
    );
    // console.log({ selectedCharacter });

    return (
      <div>
        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop" />
        ) : null}
        <h1>The Rick and Morty show</h1>

        {this.state.isShowing && (
          <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}
            episode={selectedCharacter.episode}
          />
        )}
        <input
          type="text"
          className="input"
          ref="addInput"
          placeholder="search for characters"
          onKeyUp={this.handleSearch.bind(this)}
        />
        <button onClick={this.handleSort.bind(this, "name")}>
          {""}
          Sort by name
        </button>
        <div>{results}</div>
      </div>
    );
  }
}

// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       episode: []
//     };
//   }

//   componentDidMount() {
//     this.populateWithEpisodes();
//   }

//   populateWithEpisodes() {
//     console.log({ episodeId: this.props.episodeId });
//     const episodeId = fetch();
//   }
// }

export default App;
