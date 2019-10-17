import React, { Component } from "react";
import { getAccounts } from "../../actions/accounts";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Accounts extends Component {
  static propTypes = {
    accounts: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getAccounts();
  }
  render() {
    return (
      <div>
        <h1>AccountList</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts.accounts
  };
};

export default connect(
  mapStateToProps,
  { getAccounts }
)(Accounts);
