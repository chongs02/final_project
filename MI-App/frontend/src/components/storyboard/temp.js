import React from "react";
import { connect } from "react-redux";

class Temp extends React.Component {
  render() {
    console.log(this.props.history);
    console.log(this.props.match.params);
    console.log(this.props);
    return <h2>임시 저장소</h2>;
  }
}

const mapStateToProps = state => {
  return {
    movieInfo: state.getMovieInfo.movieInfo,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Temp);
