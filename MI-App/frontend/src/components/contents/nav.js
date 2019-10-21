import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import Icon from "react-icons-kit";
import { user as userIcon } from "react-icons-kit/ikons/user";
import { power } from "react-icons-kit/ionicons/power";
import { home } from "react-icons-kit/icomoon/home";

import { StyledInput, StyledNav, StyledButton } from "./styleComponent";

const Nav = props => {
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleChange = e => {
    setKeyword(e.target.value);
    setIsSearch(false);
  };

  const handleSearchClick = () => {
    setIsSearch(true);
  };

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      this.handleSearchClick();
    }
  };

  return (
    <StyledNav className="nav">
      <div style={{ marginRight: "20px" }}>
        <NavLink to="/">
          <Icon size={24} icon={home} />
        </NavLink>
      </div>
      <StyledInput
        className="search"
        type="text"
        placeholder="영화를 검색하세요"
        value={keyword}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        size="50%"
      ></StyledInput>
      <StyledButton onClick={handleSearchClick}>검색</StyledButton>
      <div
        style={{
          textAlign: "right",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flexEnd"
        }}
      >
        <div style={{ marginLeft: "20px" }}>
          <NavLink to="/mypage">
            <Icon size={24} icon={userIcon} />
          </NavLink>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <NavLink to="/logout">
            <Icon size={24} icon={power} />
          </NavLink>
        </div>
      </div>
    </StyledNav>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
