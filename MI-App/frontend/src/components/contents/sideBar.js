import React, { Component, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { StyledContentHover } from "./styleComponent";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const SideBar = () => {
  const classes = useStyles();

  return (
    <div
      style={{
        marginTop: "5px",
        marginRight: "0px",
        paddingBottom: "-10px",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        borderLeft: "1px solid rgba(37, 40, 47, 0.1)"
      }}
    >
      <div
        style={{
          marginTop: "15px"
        }}
      >
        <NavLink exact to="/myPage/profile" style={{ textDecoration: "none" }}>
          <StyledContentHover>
            <Button
              color="primary"
              className={classes.button}
              style={{
                width: "100%",
                fontWeight: "bold",
                fontSize: "15px"
              }}
            >
              개인 정보
            </Button>
          </StyledContentHover>
        </NavLink>
      </div>
      <div>
        <NavLink
          exact
          to="/myPage/mystatics"
          style={{ textDecoration: "none" }}
        >
          <StyledContentHover>
            <Button
              color="primary"
              className={classes.button}
              style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
            >
              나의 영화
            </Button>
          </StyledContentHover>
        </NavLink>
      </div>
      <div>
        <NavLink
          exact
          to="/myPage/collaborative-seen"
          style={{ textDecoration: "none" }}
        >
          <StyledContentHover>
            <Button
              color="primary"
              className={classes.button}
              style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
            >
              추천! 봤어요
            </Button>
          </StyledContentHover>
        </NavLink>
      </div>
      <div>
        <NavLink
          exact
          to="/myPage/collaborative-like"
          style={{ textDecoration: "none" }}
        >
          <StyledContentHover>
            <Button
              color="primary"
              className={classes.button}
              style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
            >
              추천! 좋아요
            </Button>
          </StyledContentHover>
        </NavLink>
      </div>
      <div>
        <NavLink
          exact
          to="/myPage/collaborative-hate"
          style={{ textDecoration: "none" }}
        >
          <StyledContentHover>
            <Button
              color="primary"
              className={classes.button}
              style={{ width: "100%", fontWeight: "bold", fontSize: "15px" }}
            >
              이건 거르자
            </Button>
          </StyledContentHover>
        </NavLink>
      </div>
    </div>
  );
};
export default SideBar;
