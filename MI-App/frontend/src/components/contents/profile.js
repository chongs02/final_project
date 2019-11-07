import React, { Component } from "react";
import {
  StyledContentTitle,
  StyledSearchInput,
  StyledSearchForm,
  StyledMainButton
} from "./styleComponent";

class Profile extends Component {
  render() {
    return (
      <div>
        <div>
          <StyledContentTitle>나의 개인 정보</StyledContentTitle>
          <div style={{ margin: "30px 50px", width: "70%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%"
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "50px",
                  marginBottom: "30px"
                }}
              >
                <div style={{ width: "20%", alignSelf: "center" }}>아이디</div>
                <StyledSearchForm style={{ width: "70%", alignSelf: "center" }}>
                  <StyledSearchInput />
                </StyledSearchForm>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "50px",
                  marginBottom: "30px"
                }}
              >
                <div style={{ width: "20%", alignSelf: "center" }}>닉네임</div>
                <StyledSearchForm style={{ width: "70%", alignSelf: "center" }}>
                  <StyledSearchInput />
                </StyledSearchForm>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%"
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "50px",
                  marginBottom: "30px"
                }}
              >
                <div style={{ width: "20%", alignSelf: "center" }}>성별</div>
                <StyledSearchForm style={{ width: "70%", alignSelf: "center" }}>
                  <StyledSearchInput />
                </StyledSearchForm>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "50px",
                  marginBottom: "30px"
                }}
              >
                <div style={{ width: "20%", alignSelf: "center" }}>연령</div>
                <StyledSearchForm style={{ width: "70%", alignSelf: "center" }}>
                  <StyledSearchInput />
                </StyledSearchForm>
              </div>
            </div>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                width: "95%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <StyledMainButton style={{ width: "80px", height: "40px" }}>
                확인
              </StyledMainButton>
              <div style={{ width: "20px" }}></div>
              <StyledMainButton style={{ width: "80px", height: "40px" }}>
                취소
              </StyledMainButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
