import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Icon } from "react-icons-kit";
import { androidSearch } from "react-icons-kit/ionicons/androidSearch";

import {
  StyledHeader,
  StyledSearchInput,
  StyledNav,
  StyledSearchForm,
  StyledSubButton,
  StyledMainButton
} from "./styleComponent";

import logo from "../../statics/logos/logo04.png";

const Nav = props => {
  useEffect(() => {
    document.getElementsByClassName("searchBar")[0].focus();

    return () => {};
  }, [props.onClick]);

  return (
    <StyledHeader>
      <StyledNav>
        <div style={{ marginRight: "20px" }}>
          <NavLink exact to="/" style={{ textDecoration: "none" }}>
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
          <div style={{ width: "40px", height: "30px", paddingRight: "10px" }}>
            <NavLink exact to="/search">
              <div
                style={{ color: "rgb(132, 129, 122, 0.4)", height: "30px" }}
                onClick={props.onClick}
              >
                <Icon size={"30px"} icon={androidSearch} />
              </div>
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
          <NavLink exact to="/mypage">
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
