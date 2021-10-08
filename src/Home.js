import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import Calendar from "./Calendar";
import NewEvent from "./NewEvent";

const Home = (props) => (
  <Router>
    <div>
      <NavBar
        isAuthenticated={props.isAuthenticated}
        authButtonMethod={props.isAuthenticated ? props.logout : props.login}
        user={props.user}
      />
      <Container>
        <Route
          exact
          path="/"
          render={(props) => (
            <Welcome
              {...props}
              isAuthenticated={props.isAuthenticated}
              user={props.user}
              authButtonMethod={props.login}
            />
          )}
        />
        <Route
          exact
          path="/calendar"
          render={(props) =>
            props.isAuthenticated ? (
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
            props.isAuthenticated ? (
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

export default Home;