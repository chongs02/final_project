import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDailyMovie } from "../../actions/dailyMovie";

const DailyMovie = props => {
  console.log(props.dailyMovie);

  const dateInfo = () => {
    let nowDate = new Date();
    let yesterDate = nowDate.getTime() - 1 * 24 * 60 * 60 * 1000;
    nowDate.setTime(yesterDate);

    let dd = nowDate.getDate();
    let mm = nowDate.getMonth() + 1;
    let yyyy = nowDate.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    nowDate = yyyy.toString() + mm.toString() + dd.toString();
    console.log(nowDate);
    return nowDate;
  };

  useEffect(() => {
    props.getDailyMovie(dateInfo());
  }, []);

  return <div>dailymovie</div>;
};

const mapStateToProps = state => {
  return {
    dailyMovie: state.getDailyMovie.dailyMovie
  };
};

export default connect(
  mapStateToProps,
  { getDailyMovie }
)(DailyMovie);
