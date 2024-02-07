import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { registerUser } from "../../services/userService";
// import "../css/register.css";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      password: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };

  doSubmit = async () => {
    const user = this.state.data;
    try {
      const response = await registerUser(user);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
        return this.state.errors;
      }
    }
  };

  render() {
    return (
      <div id="register">
        <h1 className="text-center mt-4">Register</h1>
        <form onSubmit={this.handleSubmit} className="container">
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
