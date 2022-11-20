import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import React from 'react'
import useForm from './UseForm'
import validate from './validateInfo';
import './Form.css';

const FormSignUp = () => {
  const {handleChange, values, handleSubmit, errors} = useForm(validate);

  return (
    <div className='form-content-right'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>
          New User Account
        </h1>
        <div className='form-inputs'>
          <label 
            htmlFor='firstname' 
            className='form-label'>
            First Name
          </label>
          <input
            id='name'
            type='text' 
            name='name'
            classname='form-input'
            placeholder='Enter Your first name'
            value={values.firstname}
            onChange={handleChange}
            >
          </input>
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div className='form-inputs'>
          <label 
            htmlFor='lasttname' 
            className='form-label'>
            Last Name
          </label>
          <input
            id='name'
            type='text' 
            name='name'
            classname='form-input'
            placeholder='Enter Your Last name'
            value={values.lastname}
            onChange={handleChange}
            >
          </input>
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>
        <div className='form-inputs'>
          <label 
            htmlFor='username' 
            className='form-label'>
            Username
          </label>
          <input
            id='username'
            type='text' 
            name='username'
            classname='form-input'
            placeholder='Enter Your username'
            value={values.username}
            onChange={handleChange}
            >
          </input>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label 
            htmlFor='email' 
            className='form-label'>
            Email
          </label>
          <input
            id='email'
            type='email' 
            name='email'
            classname='form-input'
            placeholder='Enter Your email'
            value={values.email}
            onChange={handleChange}
            >
          </input>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label 
            htmlFor='password' 
            className='form-label'>
            Password
          </label>
          <input
            id='password'
            type='password' 
            name='password'
            classname='form-input'
            placeholder='Enter Your password'
            value={values.password}
            onChange={handleChange}
            >
          </input>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label 
            htmlFor='password2' 
            className='form-label'>
            Confirm Password
          </label>
          <input
            id='password2'
            type='password' 
            name='password2'
            classname='form-input'
            placeholder='Enter Your password2'
            value={values.password2}
            onChange={handleChange}
            >
          </input>
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input'
          type='submit'>
          Create an Account
        </button>
        <span className='form-input-login'>
          Already have an account? Login 
          <a href='# ' > here  
          </a>
        </span>
      </form>
    </div>
  )
}

export default FormSignUp