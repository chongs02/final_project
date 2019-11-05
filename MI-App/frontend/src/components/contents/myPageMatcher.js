import React from "react";
import Profile from "../contents/profile";
import MyStatics from "./mystatics";
import Collaborative from "../contents/collaborative";
import MyDefaultPage from "../contents/myDefaultPage";

const MyPageMatcher = props => {
  console.log(props.match.params.name);
  if (props.match.params.name === "profile") {
    return <Profile />;
  } else if (props.match.params.name === "mystatics") {
    return <MyStatics />;
  } else if (props.match.params.name === "collaborative-seen") {
    return <Collaborative name={"collaborative-seen"} />;
  } else if (props.match.params.name === "collaborative-like") {
    return <Collaborative name={"collaborative-like"} />;
  } else if (props.match.params.name === "collaborative-hate") {
    return <Collaborative name={"collaborative-hate"} />;
  } else if (
    props.match.params.name === "home" ||
    props.match.params.name === "details"
  ) {
    return <MyDefaultPage />;
  }

  return <div>일치하는 항목이 없습니다.</div>;
};
export default MyPageMatcher;
