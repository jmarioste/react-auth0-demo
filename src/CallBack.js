import React, { Component } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
const Loading = styled.div`
  height: calc(90vh - 80px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class CallBack extends Component {
  componentDidMount() {
    console.log(this.props);
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback url");
    }
  }
  render() {
    return (
      <Loading>
        <Loader type="Puff" color="#dddddd" height={100} width={100} />
        <h1>Loading...</h1>
      </Loading>
    );
  }
}
