//import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import React from 'react'
import useForm from './UseForm'
import validate from './validateInfo';
import './Form.css';

const CreateAccount = () => {
  const {handleChange, values, handleSubmit, errors} = useForm(validate);
  return (

    <div classname='form'>
      <form classname='form' onSubmit={handleSubmit}>
        <h1>
          New User Account
        </h1>
        <div classname='form-inputs'>
          <label 
            htmlFor='firstname' 
            classname='form-label'>
            First Name
          </label>
          <input
            id='firstname'
            type='text' 
            name='firstname'
            classname='form-input'
            placeholder='Enter your first name'
            value={values.firstname}
            onChange={handleChange}
            >
          </input>
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div classname='form-inputs'>
          <label 
            htmlFor='lasttname' 
            classname='form-label'>
            Last Name
          </label>
          <input
            id='lastname'
            type='text' 
            name='lastname'
            classname='form-input'
            placeholder='Enter your last name'
            value={values.lastname}
            onChange={handleChange}
            >
          </input>
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>
        <div classname='form-inputs'>
          <label 
            htmlFor='username' 
            classname='form-label'>
            Username
          </label>
          <input
            id='username'
            type='text' 
            name='username'
            classname='form-input'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
            >
          </input>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div classname='form-inputs'>
          <label 
            htmlFor='email' 
            classname='form-label'>
            Email
          </label>
          <input
            id='email'
            type='email' 
            name='email'
            classname='form-input'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
            >
          </input>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div classname='form-inputs'>
          <label 
            htmlFor='password' 
            classname='form-label'>
            Password
          </label>
          <input
            id='password'
            type='password' 
            name='password'
            classname='form-input'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
            >
          </input>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div classname='form-inputs'>
          <label 
            htmlFor='password2' 
            classname='form-label'>
            Confirm Password
          </label>
          <input
            id='password2'
            type='password' 
            name='password2'
            classname='form-input'
            placeholder='Enter your password again'
            value={values.password2}
            onChange={handleChange}
            >
          </input>
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button classname='form-input'
          type='submit'>
          Create an Account
        </button>
        <span classname='form-input-login'>
          Already have an account? Login 
          <a href='# ' > here  
          </a>
        </span>
      </form>
    </div>

  )
}

export default CreateAccount