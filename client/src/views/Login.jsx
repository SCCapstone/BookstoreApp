//imports from material UI for use in login feature 
import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

{/* The Login Page is where users will login with their registered email and password.
If a user does not have a login credential they will click on the register button to get navigated to a sign up/register page
In the event that the user has forgotten their password, they will click the forgot password button to navigate them to update their password*/}

//uses to alert and foward and render to the different page if correct
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//store the email and password of a user
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //used for the error with the use state
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  //used to associate the email and password with a corresponding name and value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //login - in a try, catch method where the user credentials are associated with a token, the type of user (customer, employee, or admin), and an ID
  const login = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("userID", res.data.userID);
      window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response?.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        setOpen(true);
      }
    }
  };

  //once event happens click to re-route
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  return (
    //login with email and password - displayed as a form, is stored in the mongoDB database, and gets a handle change method
    <div class="pb-4 h-full text-gray-800 max-w-[1400px]">
      <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
        <div />
        <div class="w-full py-16 gap-2 ">
            <div class="pb-4">
              <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
              Login
            </div>
          </div>
          <form class="justify-center">
            <div class="mb-6">
              <input
                name="email"
                value={data.email}
                class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                placeholder="Enter Email Address"
                onChange={handleChange}
              />
            </div>

            <div class="mb-6">
              <input
                type="password"
                name="password"
                value={data.password}
                class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                placeholder="Enter Password"
                onChange={handleChange}
              />
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                  <Alert onClose={handleClose} severity="error">
                    {error}
                  </Alert>
                </Snackbar>
            </div>


            {/* buttons for users to press for login, register, and forgot password*/}
            <div class="text-center lg:text-left grid pb-6">
              <Button
                class="py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                onClick={login}
              >
                Login
              </Button>
            </div>

            <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
              <Button
                href="/create_account"
                class="text-slate-800 h-13 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
              >
                Register
              </Button>

              <Button
                href="/forgot-password"
                class="text-slate-800 h-13 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
              >
                Forgot Password?
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
