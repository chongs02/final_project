import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import {
  StyledHeader,
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
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
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
                  marginRight: "20px",
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
          <NavLink exact to="/myPage">
            <StyledSubButton fontSize={"1em"}>마이페이지</StyledSubButton>
          </NavLink>
          <NavLink exact to="/logout">
            <StyledSubButton fontSize={"1em"}>로그아웃</StyledSubButton>
          </NavLink>
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
