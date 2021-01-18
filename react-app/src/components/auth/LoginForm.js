import React, { useState } from "react";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { login } from "../../utils/auth";

const LoginForm = ({ authenticated, setAuthenticated, setCurrentUser}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const emailField = document.querySelector(".login-page__form-email");
    const passwordField = document.querySelector(".login-page__form-password");
    if (email || password) {
      setEmail("");
      setPassword("");
    }
    emailField.value = "demo@spark.io";
    passwordField.value = "password";

    const user = await login(emailField.value, passwordField.value);
    if (!user.errors) {
      setAuthenticated(true);
      setCurrentUser(user);
      return history.push("/");
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
      <div className="login-page__buffer"></div>
      <div className="login-page__main">
        <form className="login-page__form" onSubmit={onLogin}>
          <div className="login-page__errors">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <section className="login-page__form-header">
            <h1>Sign In</h1>
            <button type="submit" onClick={demoLogin}>Demo</button>
          </section>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="login-page__form-email"
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="login-page__form-password"
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
            />
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="login-page__main-regbox">
          <h2>Need an account?  Sign up now.  It's Free!</h2>
          <NavLink to="/sign-up" exact={true}>Register</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
