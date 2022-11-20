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
            
            <div className="user-btn">
                <h6 style={{ color: "white" }}>
                    Forgot Username
                </h6>
            </div>
            
             <div className="pass-btn">
                <h6 style={{ color: "white" }}>
                    Forgot Password
                </h6>
            </div>
            
        </div>
    )
}

export default LoginForm