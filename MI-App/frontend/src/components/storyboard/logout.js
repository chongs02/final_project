import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import { StyledContent, StyledContentTitle } from "../contents/styleComponent";

const Logout = props => {
  console.log(props);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(props.auth.user.username);
    const timer = setTimeout(() => {
      props.logout();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <StyledContent
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <StyledContentTitle>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <div style={{ marginRight: "10px" }}>Goodbye ~ </div>
          <div style={{ color: "black" }}>{userName} !</div>
        </div>
      </StyledContentTitle>
    </StyledContent>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Logout);
