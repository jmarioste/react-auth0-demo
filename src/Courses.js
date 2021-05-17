import React, { Component } from "react";

export default class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    const auth = this.props.auth;
    // if (!auth.isAuthenticated()) {
    //   auth.login();
    //   return;
    // }
    console.log(auth);
    fetch("/courses", {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Request not authorized");
      })
      .then((response) => {
        this.setState({ courses: response.courses });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { courses } = this.state;
    return (
      <div>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
