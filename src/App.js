import React from "react";
import { Route, Switch } from "react-router";
import GlobalStyle from "./GlobalStyles";
import Home from "./Home";
import NavBar from "./NavBar";
import Profile from "./Profile";
import styled from "styled-components";
import Auth from "./Auth/Auth";
import CallBack from "./CallBack";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";

const Main = styled.main`
  padding: 20px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    //since App was wrapped in BrowserRouter, we have access to props.history.
    this.auth = new Auth(this.props.history);
  }
  render() {
    // const props = this.props;
    // const auth = this.auth;
    return (
      <React.Fragment>
        <GlobalStyle></GlobalStyle>
        <NavBar {...this.props} auth={this.auth}></NavBar>
        <Main>
          <Switch>
            <Route exact path="/">
              <Home {...this.props} auth={this.auth} />
            </Route>
            <Route path="/profile">
              <Profile {...this.props} auth={this.auth} />
            </Route>
            <Route path="/public">
              <Public {...this.props} auth={this.auth} />
            </Route>
            <Route
              path="/private"
              render={(props) => {
                if (this.auth.isAuthenticated()) {
                  return <Private {...props} auth={this.auth} />;
                } else {
                  this.props.history.push("/");
                }
              }}
            ></Route>
            <Route
              path="/courses"
              render={(props) => {
                if (
                  this.auth.isAuthenticated() &&
                  this.auth.userHasScopes(["read:course"])
                ) {
                  return <Courses {...props} auth={this.auth} />;
                } else {
                  this.props.history.push("/");
                }
              }}
            ></Route>
            <Route path="/callback">
              <CallBack {...this.props} auth={this.auth} />
            </Route>
          </Switch>
        </Main>
      </React.Fragment>
    );
  }
}

export default App;
