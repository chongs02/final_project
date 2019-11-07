import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 51;
  text-align: center;
  width: 100%;
  height: 8%;
  border-bottom: 1px solid rgba(37, 40, 47, 0.1);
  background: rgba(255, 255, 255, 0.8);
  transition: background-color 200ms ease 0s;
`;

export const StyledNav = styled.nav`
  overflow: hidden;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  height: 100%;
`;

export const StyledLoginRegister = styled.div`
  width: 100%;
  position: relative;
  height: 42%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  margin-top: -150px;
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSearchForm = styled.form`
  height: 60%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  border-bottom: 1px solid rgba(37, 40, 47, 0.1);
  box-shadow: 0 0 7px 0.5px rgba(23, 50, 68, 0.25);
`;

export const StyledFieldSet = styled.fieldset`
  width: 240px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-style: none;
  background-color: white;
  padding: 30px;
  box-shadow: 0 0 20px 0 rgba(23, 50, 68, 0.25);
`;

// groove

export const StyledH1 = styled.h1`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: london;
  color: #551a8b;
`;

export const StyledContent = styled.div`
  border-bottom: 1px solid rgba(37, 40, 47, 0.1);
`;

export const StyledContentTitle = styled.div`
  margin: 10px 0px;
  margin-top: 20px;
  color: #fc427b;
  font-family: nanumB;
  font-size: 1.2em;
`;

export const StyledInput = styled.input`
  font-size: 0.9em;
  height: 30px;
  width: 90%;
  border: 0;
  scolor: #25282f;
  background-color: white;
  border-bottom: 1px solid rgba(37, 40, 47, 0.1);
  -webkit-appearance: none;
  font-familiy: nanum;
  outline: none;
`;

export const StyledSearchInput = styled.input`
  font-size: 1em;
  font-weight: bold;
  font-family: nanumB;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  height: 100%;
  border: none;
  color: black;
  background-color: white;
  outline: none;

  ::placeholder ;
  ::-webkit-input-placeholder {
    color: rgb(132, 129, 122, 0.5);
  }
`;
// rgba(162; 155; 254; 0.5);

export const StyledMainButton = styled.button`
  cursor: pointer;
  width: 97%;
  height: 100%;
  color: white;
  font-size: ${props => (props.fontSize ? props.fontSize : "1em")};
  font-family: nanum;
  margin: 0px;
  border-radius: 10px;
  background-color: #fd7272;
  border: none;
  vertical-align: middle;
  outline: none;

  transition: all 0.3s ease-in-out;

  :hover {
    background: #f1f2f6;
    color: #fd7272;
  }
`;

// eb3b5a
// fc427b

export const StyledSideBarButton = styled.div`
  cursor: pointer;
  color: ${props => (props.color ? props.color : "#e1e6ec")};
  font-size: ${props => (props.fontSize ? props.fontSize : "18px")};
  font-family: nanum;
  margin: 0px;
  padding: ${props => (props.padding ? props.padding : "10px 40px")}
  border: none;
  background: ${props =>
    props.bgColor ? props.bgColor : "rgba(255, 255, 255, 0)"} 
  vertical-align: middle;
  text-decoration: none;
  

  transition: all 0.3s ease-in-out;

  :hover {
    background: #748ffc;
    color: #e1e6ec;
  }
`;

export const StyledSubButton = styled.button`
  cursor: pointer;
  color: ${props => (props.color ? props.color : "#eb3b5a")};
  font-size: ${props => (props.fontSize ? props.fontSize : "1em")};
  font-family: nanum;
  margin: 0px;
  padding: 0.25em 1em;
  border: none;
  background: rgba(255, 255, 255, 0);
  vertical-align: middle;
  outline: none;
`;

export const StyledMovieButton = styled.button`
  margin-left: 6px;
  margin-right: 6px;
  padding: 0px;
  cursor: pointer;
  border: none;
  background-color: white;
  outline: none;
`;

export const StyledMovieIcon = styled.div`
  color: ${props => props.color};
`;

export const AlignSubmit = styled.div`
  margin-top: 15%;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledMovieList = styled.section`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
`;

export const StyledContentHover = styled.div`
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);

  transition: all 0.3s ease-in-out;

  :hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
  }
`;

export const StyledMovieSearch = styled.div`
  cursor: pointer;
  width: 120px;
  align-items: center;
  justify-content: center;
  margin: 10px;
  margin-bottom: 5px;
`;

export const StyledMovieInfo = styled.div`
  width: 90%;
  height: 800px;
  padding: 10px;
  margin: 30px;
  background-color: white;
  display: flex;
  justify-content: flex;
  align-items: flex-start;
  font-weight: 100;
  border-radius: 5px;
  color: black;
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

export const StyledMovieDetailPoster = styled.img`
  display: block;
  width: ${props => (props.width ? props.width : "150px")};
  height: ${props => (props.height ? props.height : "100%")};
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

export const StyledH5 = styled.h5`
  margin: 0px;
  color: #778ca3;
  word-break: keep-all;
  text-overflow: ellipsis;
  height: ${props => props.height};
`;

export const StyledBottomNav = styled.nav`
  position: fixed;
  width: 100%;
  height: 8%;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #303952;
  font-size: 17px;
  font-family: "londonMM";
  color: #60a3bc;
`;
