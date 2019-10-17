import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getScore } from "../actions/movieScore";
import {movieInfo} from "../actions/movieInfo"

// django csrftoken
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

class QueryList extends Component {
  componentDidMount() {
    this.props.getScore();
    this.props.movieInfo()
  }

  moviecomponent = () => {
    const movieData = this.props.movieData;
    const data = movieData.map(item => {
      console.log(item)
      return (
          <h1 key={item.id}>{item.movie_title}</h1>
      );
    });
    return data
  };

  render() {
    return (
      <div>
        {this.props.isLoaded ? this.moviecomponent() : <h1>Loading...</h1>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieData: state.getScore.movieData,
    isLoaded: state.getScore.isLoaded
  };
};

export default connect(
  mapStateToProps,
  { getScore,movieInfo }
)(QueryList);

// <React.Fragment>
//           <Link to={item.movie_title}>{item.movie_title}</Link>
//           <Route
//             exact
//             path={item.movie_title}
//             render={() => (
//               <Content
//                 key={item.id}
//                 movie_code={item.movie_code}
//                 movie_title={item.movie_title}
//                 sad={item.sad}
//                 fear={item.fear}
//                 gratifying={item.gratifying}
//                 immersion={item.immersion}
//                 depress={item.depress}
//                 lightness={item.lightness}
//               />
//             )}
//           />
//         </React.Fragment>
