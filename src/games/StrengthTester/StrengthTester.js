import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import Player from "./Player.js";
import Rope from "./Rope.js";
export default class StrengthTester extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      rope: 0
    };
    this.getSessionDatabaseRef().set({ rope: 0 });
  }
  // componentDidMount() {
  //   let that = this;
  //   document.body.onkeyup = e => {
  //     if (e.keyCode === 32) {
  //       console.log("space bar pressed");
  //       let newRope = that.state.rope + 1;
  //       that.getSessionDatabaseRef().update({ rope: newRope });
  //     }
  //   };
  // }

  onSessionDataChanged(data) {
    console.log("Data changed");
    this.setState({ rope: data.rope });
  }

  handleButtonClick(isHost) {
    console.log("Button clicked");
    if (isHost) {
      this.getSessionDatabaseRef().set({ rope: this.state.rope - 1 });
    } else {
      this.getSessionDatabaseRef().set({ rope: this.state.rope + 1 });
    }
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
        <p>{this.state.rope}</p>
        <p>{id}</p>
        <button onClick={() => this.handleButtonClick(isHost)}>
          Pulling the rope.
        </button>
        <Player name={users[0]} points={this.state.rope} />
        <Player name={users[1]} points={this.state.rope} />
        <Rope />
      </div>
    );
  }
}
