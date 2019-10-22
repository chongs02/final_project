import React from "react";
import { connect } from "react-redux";
import { loadUserProfile } from "../../actions/auth";

class MyPage extends React.Component {
  componentDidMount() {
    this.props.loadUserProfile();
  }

  moviecomponent = () => {
    const profile = this.props.profile;
    const data = profile.map(item => {
      console.log(item);
      return <h1 key={item.id}>{item.watchedMovie}</h1>;
    });
    return data;
  };

  render() {
    console.log(this.props.profile);
    return (
      <div>
        {this.props.profile === null ? "Loading" : this.moviecomponent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
    profileLoading: state.auth.profileLoading
  };
};

export default connect(
  mapStateToProps,
  { loadUserProfile }
)(MyPage);
