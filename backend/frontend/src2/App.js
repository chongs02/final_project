import React, { Component } from "react";
import DashBoard from "./components/account/DashBoard";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <DashBoard />
        </React.Fragment>
      </Provider>
    );
  }
}
export default App;
