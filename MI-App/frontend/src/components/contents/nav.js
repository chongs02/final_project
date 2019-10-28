import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import {
  StyledHeader,
  StyledContentHover,
  StyledSearchInput,
  StyledNav,
  StyledSearchForm,
  StyledSubButton
} from "./styleComponent";

import logo from "../../statics/logos/logo04.png";
import { Icon } from "react-icons-kit";
import { androidSearch } from "react-icons-kit/ionicons/androidSearch";

const Nav = props => {
  useEffect(() => {
    document.getElementsByClassName("searchBar")[0].focus();
    return () => {};
  }, [props.onClick]);

  return (
    <StyledHeader>
      <StyledNav>
        <div style={{ marginRight: "20px" }}>
          <NavLink exact to="/main" style={{ textDecoration: "none" }}>
            <div
              id="home"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "20px"
              }}
            >
              <img
                src={logo}
                alt={"logo"}
                width={30}
                style={{
                  verticalAlign: "middle",
                  backgroundColor: "none"
                }}
              />
              <span
                style={{
                  height: "100%",
                  marginLeft: "5px",
                  fontSize: "30px",
                  fontFamily: "london"
                }}
              >
                Movie Inside
              </span>
            </div>
          </NavLink>
        </div>
        <StyledSearchForm>
          <StyledSearchInput
            className="searchBar"
            type="text"
            placeholder="영화 검색"
            value={props.value}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            // size="50%"
          ></StyledSearchInput>
          <div style={{ width: "40px", height: "30px", paddingRight: "5px" }}>
            <NavLink exact to="/search">
              <button
                id="search"
                style={{
                  padding: "0px",
                  border: "0",
                  background: "white",
                  color: "rgb(132, 129, 122, 0.4)",
                  height: "30px",
                  outline: "none"
                }}
                onClick={props.onClick}
              >
                <Icon size={"30px"} icon={androidSearch} />
              </button>
            </NavLink>
          </div>
        </StyledSearchForm>
        <div
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flexEnd",
            alignItems: "center",
            height: "60%"
          }}
        >
          <StyledContentHover>
            <NavLink exact to="/myPage">
              <StyledSubButton id="myPage" fontSize={"1em"}>
                마이페이지
              </StyledSubButton>
            </NavLink>
          </StyledContentHover>
          <StyledContentHover>
            <NavLink exact to="/logout">
              <StyledSubButton id="logout" fontSize={"1em"}>
                로그아웃
              </StyledSubButton>
            </NavLink>
          </StyledContentHover>
        </div>
      </StyledNav>
    </StyledHeader>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
