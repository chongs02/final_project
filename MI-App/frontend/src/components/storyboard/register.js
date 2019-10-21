import React, { Component } from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

import { register } from "../../actions/auth";

import { ic_person } from "react-icons-kit/md/ic_person";
import { Icon } from "react-icons-kit";
import { ic_vpn_key } from "react-icons-kit/md/ic_vpn_key";
import logo from "../../statics/logo.png";

import {
  AlignSubmit,
  StyledButton,
  StyledH1,
  StyledFieldSet,
  StyledForm,
  StyledLoginRegister,
  StyledInput
} from "../contents/StyleComponent";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const newUser = { username, password };
    this.props.register(newUser);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <StyledLoginRegister>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledFieldSet>
            <legend>등록</legend>
            <StyledH1>
              <img
                src={logo}
                alt={"logo"}
                width={50}
                style={{ verticalAlign: "middle" }}
              />
              <span>Movie Inside</span>
            </StyledH1>
            {this.props.errors.length > 0 && (
              <ul>
                {this.props.errors.map(error => (
                  <li key={error.field}>{error.message}</li>
                ))}
              </ul>
            )}
            <div>
              <Icon size={64} icon={ic_person} />

              <StyledInput
                type="text"
                id="username"
                onChange={e => this.setState({ username: e.target.value })}
              />
            </div>
            <div>
              <Icon size={64} icon={ic_vpn_key} />
              <StyledInput
                type="password"
                id="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <AlignSubmit>
              <StyledButton type="submit">등록</StyledButton>
            </AlignSubmit>
            <div style={{ textAlign: "right" }}>
              계정이 있으시다구요?
              <Link to="/login">
                s<StyledButton type="submit">Login</StyledButton>
              </Link>
            </div>
          </StyledFieldSet>
        </StyledForm>
      </StyledLoginRegister>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     register: (username, password) => {
//       console.log(username, password);
//       return dispatch(auth.register(username, password));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  { register }
)(Register);
