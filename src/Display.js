import React, { Component } from "react";
import { Todo } from "./Todo";

export class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    return (
      <div>
        <Todo />
      </div>
    );
  }
}

export default Display;
