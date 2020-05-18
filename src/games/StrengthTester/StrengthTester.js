import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import Player from "./Player.js";
import Rope from "./Rope.js";
import "./StrengthTester.css";
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
  rightWidth() {
    if (this.state.rope >= 0) {
      return "0%";
    } else {
      return this.state.rope * -7 + "%";
    }
  }

  leftWidth() {
    if (this.state.rope <= 0) {
      return "0%";
    } else {
      return this.state.rope * 7 + "%";
    }
  }

  render() {
    var isHost = this.getSessionCreatorUserId() === this.getMyUserId();

    if (this.state.rope <= -10) {
      return <div>Host wins, guest lost</div>;
    } else if (this.state.rope >= 10) {
      return <div>Guest wins, host lost</div>;
    } else {
      /* host and guest are still playing */
      return (
        <div id="strengthtester">
          <p>{this.state.rope}</p>
          <button onClick={() => this.handleButtonClick(isHost)}>
            Pulling the rope.
          </button>
          <div id="knot-container">
            <div id="left" style={{ width: this.leftWidth() }} />
            <img id="knot" src="/games/StrengthTester/knot.png" alt="knot" />
            <div id="right" style={{ width: this.rightWidth() }} />
          </div>
        </div>
      );
    }
  }
}
