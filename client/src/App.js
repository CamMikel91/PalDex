import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "./components/NavBar";
import Register from "./components/users/register";
import Login from "./components/users/login";
import Logout from "./components/users/logout";
import Pals from "./components/Pals";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <NavBar user={user} />
        <div className="container-fluid">
          <Switch>
            <Route path="/users/register" component={Register} />
            <Route path="/users/login" component={Login} />
            <Route path="/users/logout" component={Logout} />
            <Route path="/pals" component={Pals} />
            <Redirect from="/" to="/pals" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
