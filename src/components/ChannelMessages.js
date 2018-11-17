import React, { Component } from "react";
import Message from "./Message";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";

class channelMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: 0,
      message: "",
      channel: {},
      messagesEnd: React.createRef()
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
      this.setState({ channel: theChannel });
      clearInterval(this.state.timerId);
      let timerid = setInterval(
        () => this.props.fetchMessages(theChannel.id),
        3000
      );
      this.setState({ timerId: timerid });
    }
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    const channelName = this.props.match.params.name;
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
    if (
      channelName !== prevProps.match.params.name ||
      this.props.channels !== prevProps.channels
    ) {
      let theChannel = this.props.channels.find(channel => {
        return channel.name === channelName;
      });
      this.setState({ channel: theChannel });
      this.props.fetchMessages(theChannel.id);
      clearInterval(this.state.timerId);
      let timerid = setInterval(
        () => this.props.fetchMessages(theChannel.id),
        3000
      );
      this.setState({ timerId: timerid });
    }
  }
  scrollToBottom() {
    // this.state.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    let messageListContainer = document.getElementById("scrolldiv");
    messageListContainer.scrollTop = messageListContainer.scrollHeight;
  }

  render() {
    let channelMessages = this.props.messages.map(aMessage => (
      <Message
        key={`${aMessage.message}+${aMessage.timestamp}`}
        aMessage={aMessage}
      />
    ));
    // let theChannel = this.props.channels.find(channel => {
    //   return channel.name === this.props.match.params.name;
    // });
    return (
      <div
        className="mx-3"
        style={{
          backgroundImage: "url(" + this.state.channel.image_url + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div
          className="col"
          id="scrolldiv"
          style={{
            overflow: "auto",
            height: "78vh"
          }}
        >
          {channelMessages}
          <div ref={this.state.messagesEnd} />
        </div>

        <form
          className=" input-group mb-3 col-10"
          style={{ position: "fixed", bottom: 45 }}
          onSubmit={this.submitHandler}
        >
          <input
            type="text"
            className=" form-control"
            placeholder="Type your message here..."
            aria-label=""
            aria-describedby="button-addon2"
            onChange={this.changeHandler}
          />
          <div className="input-group-append">
            <input
              className="btn btn-outline-primery"
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
