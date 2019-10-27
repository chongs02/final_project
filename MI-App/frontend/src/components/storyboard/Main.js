// import React, { Component, Fragment } from "react";
import React, { useState, useEffect, Fragment } from "react";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { movieInfo } from "../../actions/movieInfo";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Nav from "../contents/nav";
import SearchResult from "./searchResult";
import MyPage from "./myPage";
import Logout from "./logout";
import DailyBoxOffice from "../contents/dailyBoxOffice";
import { clearMovieInfo } from "../../actions/movieInfo";

const Main = props => {
  const [keyword, setKeyword] = useState("");
  const [renderKeyword, setRenderKeyword] = useState("");
  const [refresh, setRefresh] = useState("/main");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {}, [refresh]);

  const handleChange = e => {
    setKeyword(e.target.value);
  };

  const handleClick = clickType => {
    if (clickType === "home") {
      if (refresh === "/main") {
        setRefresh("/main2");
        setPageUrl(window.location.href);
      } else {
        setRefresh("/main");
        setPageUrl(window.location.href);
      }
    } else {
      setPageUrl(window.location.href);
      setRenderKeyword(keyword);
      props.movieInfo(keyword);
      document.getElementById("search").click();
    }
  };

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      handleClick();
    }
  };

  console.log(pageUrl);

  return (
    <Fragment>
      <BrowserRouter>
        <Nav
          main={refresh}
          value={keyword}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onClick={handleClick}
        ></Nav>
        <div style={{ height: "100%", marginLeft: "2%", marginRight: "2%" }}>
          <div style={{ height: "8%" }} />
          <Switch>
            <Route
              exact
              path="/search"
              render={() => <SearchResult keyword={renderKeyword} />}
            />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
          <DailyBoxOffice page={pageUrl}></DailyBoxOffice>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    movieData: state.getScore.movieData,
    InfoLoaded: state.getMovieInfo.InfoLoaded,
    scoreLoaded: state.getScore.scoreLoaded
  };
};

export default connect(
  mapStateToProps,
  { logout, movieInfo, clearMovieInfo }
)(Main);

// class Main extends Component {
//   state = {
//     keyword: "",
//     renderKeyword: ""
//     // isPageChange: false
//   };

//   handleChange = e => {
//     this.setState({
//       keyword: e.target.value
//     });
//   };

//   handleClick = clickType => {
//     if (clickType === "home") {
//       window.location.href = "/main";
//     } else {
//       const { keyword } = this.state;

//       this.setState({
//         renderKeyword: keyword
//       });
//       this.props.movieInfo(keyword);
//       document.getElementById("search").click();
//     }
//   };

//   handleKeyPress = e => {
//     if (e.charCode === 13) {
//       this.handleClick();
//     }
//   };

//   render() {
//     const { keyword, renderKeyword } = this.state;
//     const page = window.location.href;

//     return (
//       <Fragment>
//         <BrowserRouter>
//           <Nav
//             value={keyword}
//             onChange={this.handleChange}
//             onKeyPress={this.handleKeyPress}
//             onClick={this.handleClick}
//           ></Nav>
//           <div style={{ height: "100%", marginLeft: "2%", marginRight: "2%" }}>
//             <div style={{ height: "8%" }} />
//             <Switch>
//               <Route
//                 exact
//                 path="/search"
//                 render={() => <SearchResult keyword={renderKeyword} />}
//               />
//               <Route exact path="/mypage" component={MyPage} />
//               <Route exact path="/logout" component={Logout} />
//             </Switch>
//             <DailyBoxOffice page={page}></DailyBoxOffice>
//           </div>
//         </BrowserRouter>
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//     movieData: state.getScore.movieData,
//     InfoLoaded: state.getMovieInfo.InfoLoaded,
//     scoreLoaded: state.getScore.scoreLoaded
//   };
// };

// export default connect(
//   mapStateToProps,
//   { logout, movieInfo, clearMovieInfo }
// )(Main);
