import React, { Component, Fragment } from "react";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import { Provider, connect } from "react-redux";

import { loadUser } from "./actions/auth";

import store from "./store";
import Login from "./components/storyboard/login";
import Register from "./components/storyboard/register";
import Main from "./components/storyboard/main";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
                html {
                  height: 100%;
                }

                body{
                  height: 100%;
                  color: black;
                  background-color: white;
                  font-family: nanum;
                  margin:0px;
                }

                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
                `;

class RootContainerComponent extends Component {
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
            return <Redirect to="/login" />;
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
      <Fragment>
        <GlobalStyle></GlobalStyle>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute exact path="/main" component={Main} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </Fragment>
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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
