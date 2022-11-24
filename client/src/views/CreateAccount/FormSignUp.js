//import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import React from "react";
import useForm from "./UseForm";
import validate from "./validateInfo";
import "./FormSignUp.css";

const CreateAccount = () => {
  const { handleChange, values, handleSubmit, errors } = useForm(validate);

  return (
    <div className="form">
      <form className="form" onSubmit={handleSubmit}>
        <h1>New User Account</h1>

        <div className="form-inputs space">
          <label htmlFor="firstname" className="form-label">
            First Name &nbsp;
          </label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            classname="form-input"
            placeholder="Enter your first name"
            maxlen = "30"
            value={values.firstname}
            onChange={handleChange}
          ></input>
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>

        <div className="form-inputs space">
          <label htmlFor="lasttname" className="form-label">
            Last Name &nbsp;
          </label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            classname="form-input"
            placeholder="Enter your last name"
            value={values.lastname}
            onChange={handleChange}
          ></input>
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>

        <div className="form-inputs space">
          <label htmlFor="username" className="form-label">
            Username &nbsp;
          </label>
          <input
            id="username"
            type="text"
            name="username"
            classname="form-input"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          ></input>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs space">
          <label htmlFor="email" className="form-label">
            Email &nbsp; &nbsp; &nbsp; &nbsp;
          </label>
          <input
            id="email"
            type="email"
            name="email"
            classname="form-input"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          ></input>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs space">
          <label htmlFor="password" className="form-label">
            Password &nbsp;
          </label>
          <input
            id="password"
            type="password"
            name="password"
            classname="form-input"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          ></input>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-inputs space">
          <label htmlFor="password2" className="form-label">
            Confirm Password &nbsp;
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            classname="form-input"
            placeholder="Confirm your password"
            value={values.password2}
            onChange={handleChange}
          ></input>
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className="form-input" type="submit">
          Create an Account
        </button>
        <span className="form-input-login"> &nbsp;
          Already have an account? Login
          <a href="/login"> here</a>
        </span>
      </form>
    </div>
  );
};

export default CreateAccount;
