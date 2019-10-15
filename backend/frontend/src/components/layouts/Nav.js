import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

class Nav extends Component {
  state = {};
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const AuthLink = (
      <div>
        <span>{user ? `welcome ${user.username}` : ""}</span>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );

    const GuestLink = (
      <div>
        <Link to="/login">Log In</Link>
        <Link to="/register">Register</Link>
      </div>
    );

    return (
      <nav className="nav">
        <input className="search" type="text" placeholder="검색하시오"></input>
        <button>검색</button>
        <div>{isAuthenticated ? AuthLink : GuestLink}</div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
