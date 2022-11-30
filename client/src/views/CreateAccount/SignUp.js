import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const url = "/api/users";
      const res = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      console.log(error);
      if (error.response?.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="form">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <div className="form-inputs space">
          <label htmlFor="firstName" className="form-label">
            First Name &nbsp;
          </label>
          <input
            type="text"
            name="firstName"
            className="form-input"
            placeholder="First name"
            maxlen="30"
            value={data.firstName}
            onChange={handleChange}
          />
          {/* {errors.firstname && <p>{errors.firstName}</p>} */}
        </div>

        <div className="form-inputs space">
          <label htmlFor="lastName" className="form-label">
            Last Name &nbsp;
          </label>
          <input
            type="text"
            name="lastName"
            className="form-input"
            placeholder="Last name"
            value={data.lastName}
            onChange={handleChange}
          ></input>
          {/* {errors.lastName && <p>{errors.lastName}</p>} */}
        </div>

        {/* <div className="form-inputs space">
          <label htmlFor="username" className="form-label">
            Username &nbsp;
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter your username"
            value={data.username}
            onChange={handleChange}
          ></input>
          {errors.username && <p>{errors.username}</p>}
        </div> */}
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
          {/* {errors.email && <p>{errors.email}</p>} */}
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
          {/* {errors.password && <p>{errors.password}</p>} */}
        </div>
        {/* <div className="form-inputs space">
          <label htmlFor="password2" className="form-label">
            Confirm Password &nbsp;
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="form-input"
            placeholder="Confirm your password"
            value={data.password2}
            onChange={handleChange}
          ></input>
          {errors.password2 && <p>{errors.password2}</p>}
        </div> */}
        {error && <div>{error}</div>}
        <button className="form-input" type="submit">
          Create an Account
        </button>
        <span className="form-input-login">
          {" "}
          &nbsp; Already have an account? Login
          <a href="/login"> here</a>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
