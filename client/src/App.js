import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Pals from "./components/Pals";
import "./css/app.css";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container-fluid">
          <Switch>
            <Route path="/pals" component={Pals} />
            <Redirect from="/" to="/pals" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
