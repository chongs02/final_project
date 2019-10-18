import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import styled from "styled-components";
import { ic_person } from "react-icons-kit/md/ic_person";
import { Icon } from "react-icons-kit";
import { ic_vpn_key } from "react-icons-kit/md/ic_vpn_key";
import logo from "../../statics/logo.png";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const StyledLogin = styled.div`
  flex: 1;
  height:100%
  display: flex;
  justify-content: center;
  `;

const StyledForm = styled.form`
  height: 100%;
  align-item: center;
`;

const StyledH1 = styled.h1`
  color: white;
  text-align: right;
`;

const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: palevioletred;
  border: 2px solid palevioletred;
  margin-right: 0px;
`;

const AlignSubmit = styled.div`
  text-align: right;
`;

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <StyledLogin>
        <StyledForm onSubmit={this.onSubmit}>
          {/* <fieldset> */}

          <StyledH1>
            <img src={logo} alt={"logo"} width={50} />
            Movie Inside
          </StyledH1>
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <p>
            {/* <label htmlFor="username">Username</label> */}
            <div style={{ color: "white" }}>
              <Icon size={64} icon={ic_person} />
              <Input
                type="text"
                id="username"
                onChange={e => this.setState({ username: e.target.value })}
              />
            </div>
          </p>
          <p>
            <div style={{ color: "white" }}>
              <Icon size={64} icon={ic_vpn_key} />
              <Input
                type="password"
                id="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
          </p>
          <AlignSubmit>
            <StyledButton type="submit">Login</StyledButton>
          </AlignSubmit>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          {/* </fieldset> */}
        </StyledForm>
      </StyledLogin>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.error) {
    errors = Object.keys(
      state.auth.errors.map(field => {
        return { field, message: state.auth.errors[field] };
      })
    );
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     login: (username, password) => {
//       return dispatch(auth.login(username, password));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  { login }
)(Login);
