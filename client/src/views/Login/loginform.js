import React from "react";
import "./loginform.css";

const LoginForm = () => {
  return (
    <div className="cover login">
      <h1>Login</h1>
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="username" placeholder="password" />
      <div className="login-btn">Login</div>
      <p className="text">
        Or create an account
        <a href="# "> here</a>
      </p>
      <button onClick="user-btn">Forgot Username</button>
      <button onClick="pass-btn">Forgot Password</button>
    </div>
  );
};

export default LoginForm;
