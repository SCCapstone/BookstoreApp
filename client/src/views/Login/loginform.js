import React, { useState } from "react";
import axios from "axios";
import "./loginform.css";

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
      console.log(res.message);
    } catch (error) {
      console.log(error);
      if (error.response?.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="cover login">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs space">
          <label htmlFor="email" className="form-label">
            Email &nbsp; &nbsp; &nbsp; &nbsp;
          </label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email"
            value={data.email}
            required
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-inputs space">
          <label htmlFor="password" className="form-label">
            Password &nbsp;
          </label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
            value={data.password}
            required
            onChange={handleChange}
          ></input>
        </div>
        {error && <div>{error}</div>}
        <button className="login-btn" type="submit">
          Login
        </button>
        <span className="form-input-login">
          {" "}
          &nbsp; Don't have an account? sign up
          <a href="/signup"> here</a>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
