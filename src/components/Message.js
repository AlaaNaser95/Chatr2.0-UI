import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div className="card w-50 mb-4">
        <div className="card-body">
          <h5 className="card-title">{this.props.aMessage.username}:</h5>
          <p className="card-text">{this.props.aMessage.message}</p>
          {/* <p className="card-text">{this.props.aMessage.timestamp}</p> */}
        </div>
      </div>
    );
  }
}

export default Message;
