import React, { Component } from "react";
import styled from "styled-components";

const ProfileImg = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 50%;
  src: ${(props) => props.src};
`;

export default class Profile extends Component {
  state = {
    profile: null,
    error: "",
  };

  componentDidMount() {
    //;
    this.loadUserProfile();
  }

  loadUserProfile = () => {
    this.props.auth.getProfile((profile, error) => {
      this.setState({
        profile,
        error,
      });
    });
  };

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <div>
        <h2>Profile </h2>
        <p>{profile.nickname}</p>
        <ProfileImg src={profile.picture} alt="profile pic" />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}
