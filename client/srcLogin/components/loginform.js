import React, { useState } from "react";
import "./loginform.css"

const LoginForm = () => {

    return (
        <div className="cover">
            <h1>
                Login
            </h1>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <div className="login-btn">Login</div>
            <p className="text">
                Or create an account
                <a href='# ' > here  
                </a>
            </p>
            <p className="text">
                Click here if 
                <a href='# ' > forgot password
                </a>
            </p>
            <p className="text">
                Click here if 
                <a href='# ' > forgot username
                </a>
            </p>
        </div>
    )
}

export default LoginForm