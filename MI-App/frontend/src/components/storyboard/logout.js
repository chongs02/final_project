import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Logout = props => {
  console.log(props);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(props.auth.user.username);
    const timer = setTimeout(() => {
      props.logout();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      잘가요 내 소중한 {userName} 님 ^^
    </div>
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
