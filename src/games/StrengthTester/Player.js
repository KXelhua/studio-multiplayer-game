import React from "react";

class Player extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>Name: {this.props.name}</h1>
        <h1>Points: {this.props.points}</h1>
      </div>
    );
  }
}

export default Player;
