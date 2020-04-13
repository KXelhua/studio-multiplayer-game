import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import Player from "./Player.js";
import Rope from "./Rope.js";
export default class StrengthTester extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      points: 0
    };
  }

  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var isHost = this.getSessionCreatorUserId() === this.getMyUserId();
    var creator = UserApi.getName(this.getSessionCreatorUserId());
    return (
      <div>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <p>{users[0]}</p>
        <p>{users[1]}</p>
        The user is <b>{isHost ? "host" : "guest"}</b>.
        <Player name={users[0]} points={this.state.points} />
        <Player name={users[1]} points={this.state.points} />
        <Rope />
      </div>
    );
  }
}
