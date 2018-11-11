import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";
import { Redirect } from "react-router-dom";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      owner: this.props.user,
      image_url: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.createChannel(this.state);
  }

  render() {
    // const { username, password } = this.state;

    const type = this.props.match.url.substring(1);
    if (!this.props.user) {
      return <Redirect to="/welcome" />;
    }
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">Create Channel</h5>
          <form onSubmit={this.submitHandler} noValidate>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Channel name"
                name="name"
                required
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder=""
                name="url"
                //required
                onChange={this.changeHandler}
              />
            </div>
            <input className="btn btn-primary" type="submit" value="create" />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.auth.user
});
const mapDispatchToProps = dispatch => {
  return {
    createChannel: form => dispatch(actionCreators.createChannel(form)),
    setErrors: () => dispatch(actionCreators.setErrors())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm);