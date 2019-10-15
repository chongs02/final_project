import React, { Component } from "react";
import Content from "./layouts/Content";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getScore } from "../actions/movieScore";

// django csrftoken
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class QueryList extends Component {
  componentDidMount() {
    this.props.getScore();
  }

  moviecomponent = () => {
    const movieData = this.props.movieData;
    movieData.map(item => {
      return (
        <React.Fragment>
          <Link to={`/movie/${item.movie_title}`}>{item.movie_title}</Link>
        </React.Fragment>
      );
    });
  };

  render() {
    console.log(this.props.movieData);
    return (
      <div>
        {this.props.isLoaded ? this.moviecomponent() : <h1>Loading...</h1>}
        <Route exact path="/movie/:movie_title" component={Content} />
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
  { getScore }
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
