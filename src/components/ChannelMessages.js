import React, { Component } from "react";
import Message from "./Message";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";
// import axios from "axios";
// import { get } from "http";
class channelMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: 0,
      message: ""
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  submitHandler(e) {
    e.preventDefault();
    let channelName = this.props.match.params.name;
    let theChannel = this.props.channels.find(channel => {
      return channel.name === channelName;
    });
    this.props.sendMessage(theChannel.id, {
      username: this.props.user.username,
      message: this.state.message
    });
  }
  changeHandler(e) {
    this.setState({ message: e.target.value });
  }
  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }
  componentDidMount() {
    const channelName = this.props.match.params.name;
    if (this.props.channels.length > 0) {
      let theChannel = this.props.channels.find(channel => {
        return channel.name === channelName;
      });
      // this.props.fetchMessages(theChannel.id);
      clearInterval(this.state.timerId);
      let timerid = setInterval(
        () => this.props.fetchMessages(theChannel.id),
        3000
      );
      this.setState({ timerId: timerid });
    }
  }

  componentDidUpdate(prevProps) {
    const channelName = this.props.match.params.name;
    if (
      channelName !== prevProps.match.params.name ||
      this.props.channels !== prevProps.channels
    ) {
      let theChannel = this.props.channels.find(channel => {
        return channel.name === channelName;
      });
      this.props.fetchMessages(theChannel.id);
      clearInterval(this.state.timerId);
      let timerid = setInterval(
        () => this.props.fetchMessages(theChannel.id),
        3000
      );
      this.setState({ timerId: timerid });
    }
  }

  render() {
    let channelMessages = this.props.messages.map(aMessage => (
      <Message
        key={`${aMessage.message}+${aMessage.timestamp}`}
        aMessage={aMessage}
      />
    ));

    return (
      <div>
        <div>{channelMessages}</div>

        <form className="input-group mb-3" onSubmit={this.submitHandler}>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="button-addon2"
            onChange={this.changeHandler}
          />
          <div className="input-group-append">
            <input
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
              value="Send"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.channels.messages,
  channels: state.channels.channels,
  user: state.auth.user
});
const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: id => dispatch(actionCreators.fetchMessages(id)),
    sendMessage: (channelid, message) =>
      dispatch(actionCreators.sendMessage(channelid, message))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(channelMessages);
