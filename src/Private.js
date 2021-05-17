import React, { Component } from "react";

export default class Private extends Component {
  state = {
    message: "Private",
  };

  componentDidMount() {
    const auth = this.props.auth;
    // if (!auth.isAuthenticated()) {
    //   auth.login();
    //   return;
    // }
    console.log(auth);
    fetch("/private", {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Request not authorized");
      })
      .then((response) => {
        this.setState({ message: response.message });
      })
      .catch((error) => this.setState({ message: error.message }));
  }

  render() {
    // const auth = this.props.auth;
    // if (!auth.isAuthenticated()) {
    //   auth.login();
    //   return;
    // }
    return <p>{this.state.message}</p>;
  }
}
