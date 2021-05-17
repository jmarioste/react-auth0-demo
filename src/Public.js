import React, { Component } from "react";

export default class Public extends Component {
  state = {
    message: "Public",
  };

  componentDidMount() {
    fetch("/public")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.text);
      })
      .then((response) => {
        this.setState({ message: response.message });
      })
      .catch((error) => this.setState({ message: error }));
  }

  render() {
    return <p>{this.state.message}</p>;
  }
}
