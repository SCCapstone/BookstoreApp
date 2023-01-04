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
    } catch (error) {
      console.log(error);
      if (error.response?.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="cover login">
      <h3>Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs space">
          <label htmlFor="emai" className="form-label">
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
        &nbsp;
        {error && <div>{error}</div>}
        
        {/* <span className="form-input-login">
          {" "}
          &nbsp; Don't have an account? sign up
          <a href="/signup"> here</a>
        </span> */}
        &nbsp;
      </form>
      <div className="buttonBox"> 
        <button className="login-btn" type="submit">
          Sign In
        </button>
        &nbsp;
        <div className="boxRow">
         &nbsp;
          <button className="createNewAcct" type="submit">
            Create A New Account
          </button>
          <button className="forgotPass" type="submit">
            Forgot Password
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default SignUp;
