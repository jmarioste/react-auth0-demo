import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  height: 60px;
  /* position: fixed; */
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: left;

  background-color: #181c20;
  width: 100%;
  font-size: 1rem;

  ul {
    list-style: none;
    align-items: center;
    display: flex;
    width: 100%;
    li {
      /* padding: 20px; */
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:not(.spacer):hover {
        transition: all 0.3s ease-out;
        background-color: #46494d;
      }
      a {
        text-decoration: none;
        color: white;
        padding: 20px;
      }
    }

    li.spacer {
      flex-grow: 1;
    }
  }
`;

export default class NavBar extends Component {
  render() {
    const { isAuthenticated, logout, login, userHasScopes } = this.props.auth;
    return (
      <StyledNavBar>
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          {isAuthenticated() && (
            <li>
              <Link to="/profile"> Profile</Link>
            </li>
          )}
          <li>
            <Link to="/public"> Public</Link>
          </li>
          {isAuthenticated() && (
            <li>
              <Link to="/private"> Private</Link>
            </li>
          )}
          {isAuthenticated() && userHasScopes(["read:course"]) && (
            <li>
              <Link to="/courses"> Courses</Link>
            </li>
          )}
          <li className="spacer"></li>
          <li>
            <a href="#!" onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Logout" : "Log in"}
            </a>
          </li>
        </ul>
      </StyledNavBar>
    );
  }
}
