import styled from "styled-components";

export const StyledNav = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-align: right;
  display: inline-block;
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

export const StyledMovieList = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 5px;
  padding-top: 20px;
  width: 100%;
`;

export const StyledMovieSearch = styled.div`
  width: 120px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const StyledMovieInfo = styled.div`
  width: 43%;
  background-color: white;
  margin-bottom: 70px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: 300;
  padding: 50px;
  border-radius: 5px;
  color: #adaeb9;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;
