import React from "react";
import { connect } from "react-redux";

const DailyMovie = props => {
  return (
    <div>
      {/* {props.movieInfo.map(item => {
        <div>{item.movieNm}</div>;
      })} */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    movieInfo: state.getMovieInfo.movieInfo
  };
};

export default connect(mapStateToProps)(DailyMovie);
