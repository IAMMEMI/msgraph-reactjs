
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import withAuthProvider from "./AuthProvider";
import NavBar from "./NavBar";
import ErrorMessage from "./ErrorMessage";
import Welcome from "./Welcome";
import Calendar from "./Calendar";
import NewEvent from "./NewEvent";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  render() {
    let error = null;
    if (this.props.error) {
      error = (
        <ErrorMessage
          message={this.props.error.message}
          debug={this.props.error.debug}
        />
      );
    }

    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={this.props.isAuthenticated}
            authButtonMethod={
              this.props.isAuthenticated ? this.props.logout : this.props.login
            }
            user={this.props.user}
          />
          <Container>
            {error}
            <Route
              exact
              path="/"
              render={(props) => (
                <Welcome
                  {...props}
                  isAuthenticated={this.props.isAuthenticated}
                  user={this.props.user}
                  authButtonMethod={this.props.login}
                />
              )}
            />
            <Route
              exact
              path="/calendar"
              render={(props) =>
                this.props.isAuthenticated ? (
                  <Calendar {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/newevent"
              render={(props) =>
                this.props.isAuthenticated ? (
                  <NewEvent {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Container>
        </div>
      </Router>
    );
  }
}

export default withAuthProvider(App);
