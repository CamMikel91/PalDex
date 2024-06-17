import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { login } from "../../services/authService";
import "../css/login.css";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div id="login" className="container pt-5">
        <h1 className="text-center mt-4">Login</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
