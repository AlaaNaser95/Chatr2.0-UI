import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import * as actionCreators from "./store/actions/index";
import { connect } from "react-redux";
import CreateForm from "./components/CreateForm";
class App extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Route path="/createChannel" component={CreateForm} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  checkToken: () => dispatch(actionCreators.checkForExpiredToken())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
