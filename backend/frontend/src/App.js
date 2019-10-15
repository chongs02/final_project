import React from "react";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { loadUser } from "./actions/auth";

import rootReducer from "./reducers";

import Login from "./components/users/login";
import Register from "./components/users/register";
import Nav from "./components/layouts/Nav";
import QuaryList from "./components/QuaryList";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

class RootContainerComponent extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.props.auth.isLoading) {
            return <em>Loading...</em>;
          } else if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
          } else {
            return <ChildComponent {...props} />;
          }
        }}
      />
    );
  };
  render() {
    let { PrivateRoute } = this;
    return (
      <BrowserRouter>
        <Nav></Nav>
        <Switch>
          <PrivateRoute exact path="/" component={QuaryList} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

let RootContainer = connect(
  mapStateToProps,
  { loadUser }
)(RootContainerComponent);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
