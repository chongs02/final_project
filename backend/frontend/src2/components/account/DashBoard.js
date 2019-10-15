import React, { Component } from "react";
import Accounts from "./Accounts";
import Form from "./Form";

class DashBoard extends Component {
  render() {
    return (
      <React.Fragment>
        <Form />
        <Accounts />
      </React.Fragment>
    );
  }
}
export default DashBoard;
