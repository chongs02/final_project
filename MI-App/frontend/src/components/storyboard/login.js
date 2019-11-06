import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { login } from "../../actions/auth";

import logo from "../../statics/logos/logo04.png";
import logo2 from "../../statics/logos/logo03.png";
import bgImg01 from "../../statics/bgImgs/01.jpg";
import bgImg02 from "../../statics/bgImgs/10.jpg";
// import bgImg03 from "../../statics/bgImgs/9.jpg";

import {
  AlignSubmit,
  StyledMainButton,
  StyledSubButton,
  StyledH1,
  StyledFieldSet,
  StyledForm,
  StyledLoginRegister,
  StyledInput,
  StyledBottomNav,
  StyledContentHover
} from "../contents/styleComponent";

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
      return <Redirect to="/main" />;
    }
    return (
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <div style={{ display: "flex", height: "50%" }}>
          <div style={{ width: "100%" }}>
            <img src={bgImg01} alt={"firstImg"} width="100%" height="100%" />
          </div>
          <div style={{ width: "100%" }}>
            <img src={bgImg02} alt={"secondImg"} width="100%" height="100%" />
          </div>
        </div>
        <StyledLoginRegister>
          {/* <div style={{ height: "100%" }}>
            <img src={bgImg03} alt={"thirdImg"} width="100%" height="100%" />
          </div> */}
          <StyledForm onSubmit={this.onSubmit}>
            <StyledFieldSet>
              <StyledH1>
                <img
                  src={logo}
                  alt={"logo"}
                  width={40}
                  style={{ verticalAlign: "middle" }}
                />
                <span style={{ marginLeft: "5px" }}>Movie Inside</span>
              </StyledH1>
              <h3
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  fontFamily: "nanum",
                  color: "#c44569"
                }}
              >
                로그인
              </h3>
              {this.props.errors.length > 0 && (
                <ul>
                  {this.props.errors.map(error => (
                    <li key={error.field}>{error.message}</li>
                  ))}
                </ul>
              )}
              <div
                style={{
                  display: "block",
                  marginTop: "20%"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginBottom: "10%"
                  }}
                >
                  <StyledInput
                    type="text"
                    id="username"
                    placeholder="아이디"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginBottom: "10%"
                  }}
                >
                  <StyledInput
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </div>
              </div>
              <AlignSubmit>
                <StyledMainButton type="submit" fontSize={"0.9em"}>
                  로그인
                </StyledMainButton>
              </AlignSubmit>
              <div
                style={{
                  margin: 0,
                  marginTop: "15%",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#718093"
                }}
              >
                계정이 없으시다구요?
                <Link to="/register">
                  <StyledSubButton type="submit" fontSize={"0.9em"}>
                    회원가입
                  </StyledSubButton>
                </Link>
              </div>
            </StyledFieldSet>
          </StyledForm>
        </StyledLoginRegister>
        <StyledBottomNav>
          <div>
            <img
              src={logo2}
              alt={"logo2"}
              width={30}
              style={{
                verticalAlign: "middle",
                backgroundColor: "none",
                paddingLeft: "20px"
              }}
            />
            <span style={{ marginLeft: "7px", marginRight: "20px" }}>
              Movie Inside
            </span>
          </div>
          <div style={{ paddingRight: "30px" }}>Copyright © 2019 HAND Inc.</div>
        </StyledBottomNav>
      </div>
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
