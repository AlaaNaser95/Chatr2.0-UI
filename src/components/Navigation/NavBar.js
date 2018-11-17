import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// // Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/welcome">
          Chatr2.0
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {this.props.user && <SideNav />}
          <AuthButton />
          {/* <Link className="nav-link heading" to="/createChannel">
            <span className="nav-link-text mr-2">Add Channel</span>
            <FontAwesomeIcon icon={faPlusCircle} />
          </Link> */}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(NavBar));
