import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const authenticated = isAuthenticated();
    return (
      <>
        <h2>Home 2</h2>
        {authenticated && <Link to="/profile">View profile</Link>}
      </>
    );
  }
}
