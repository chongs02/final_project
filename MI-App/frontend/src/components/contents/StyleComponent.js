import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 51;
  color: rgb(255, 255, 255);
  text-align: center;
  width: 100%;
  height: 10%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px,
    rgb(210, 210, 210) 0px 0px 0px 0px;
  background: rgb(255, 255, 255);
  transition: background-color 200ms ease 0s;
`;

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StyledInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: ${props => props.size};
`;

export const StyledLoginRegister = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  back
`;

export const StyledForm = styled.form`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledFieldSet = styled.fieldset`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-style: groove;
`;

export const StyledH1 = styled.h1`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: london;
`;

export const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin-right: 0px;
  font-family: "font";
  vertical-align: middle;
`;

export const AlignSubmit = styled.div`
  text-align: right;
`;

export const StyledMovieList = styled.section`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
  font
`;

export const StyledMovieSearch = styled.div`
  cursor: pointer;
  width: 120px;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

export const StyledMovieInfo = styled.div`
  background-color: white;
  margin-bottom: 70px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: 100;
  padding: 50px;
  border-radius: 5px;
  color: #adaeb9;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

export const StyledMoviePoster = styled.img`
  display: flex;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

export const StyledMovieTitle = styled.p`
  text-align: center;
  margin: 0px;
  margin-top: 10px;
  word-break: keep-all;
`;
