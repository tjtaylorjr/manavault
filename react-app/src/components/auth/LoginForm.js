import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../utils/auth";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
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
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <h1>Sign In</h1>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
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
