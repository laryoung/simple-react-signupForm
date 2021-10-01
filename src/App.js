import React from "react";
// import Signup from "./components/Signup";
import Login from "./components/Login";

//Loader css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
//import styled component
import { StyledContainer } from "./components/Style";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import BasicRoute from "./components/BasicRoute";
import AuthRoute from "./components/AuthRoute";

import { connect } from "react-redux";

function App(props) {
  return (
    <BrowserRouter>
      {props.checked && (
        <StyledContainer>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <BasicRoute path="/signup">
              <CreateAccount />
            </BasicRoute>
            <Route path="/login">
              <Login />
            </Route>
            <AuthRoute path="/dashboard">
              <Dashboard />
            </AuthRoute>
          </Switch>
        </StyledContainer>
      )}
    </BrowserRouter>
  );
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
});
export default connect(mapStateToProps)(App);
