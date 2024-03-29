import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from 'uuid';
import { isLoggedIn, sendToHome } from "../utils/PermissionUtils";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ currentUser }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("userID", res.data.userID);
      console.log(res.data);
      let initials = "";
      if (res.data?.firstName?.length > 0) {
        initials += res.data.firstName[0];
        if (res.data?.lastName?.length > 0) {
          initials += res.data.lastName[0];
        }
      } else {
        initials = "";
      }
      localStorage.setItem("userInitials", initials);
      window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response?.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        setOpen(true);
      }
    }
  };

  const openForgotPassword = async () => {
    swal.fire({
      title: "Send email to retrieve your password?",
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
      confirmButtonText: "Send Email",
      showCancelButton: true,
    }).then((result) => {
      console.log(result);
      if (!result.isConfirmed || result.value?.length <= 0) {
        swal.fire(
          'Email failure!',
          `Failed to send email`,
          'error'
        );
        return;
      }
      const email = result.value;
      try {
        const url = `/api/users/email/${email}`;
        console.log(url);
        axios.get(url).then((res) => {
          res.data.updatePasswordToken = uuidv4();
          const putURL = '/api/users/' + res.data._id;
          axios.put(putURL, res.data).then(
            emailjs.send(
              "service_trb6232",
              "template_jetptvm",
              {
                pw_link: "http://bookstore-app.herokuapp.com/forgot/" + res.data.updatePasswordToken,
                to_email: email,
                to_name: res.data.firstName,
              },
              "0v71YVpIY79kGX06h"
            ).then(
              swal.fire(
                'Email successfully sent',
                "Check your email for the link to reset your password",
                'success'
              )
            )
          ).catch((error) => {
            console.log(error);
          })
        }).catch((error) => {
          if (error.response.status === 404) {
            swal.fire(
              'Email failure!',
              "There is no user with that email address.",
              'error'
            );
          } 
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
      
    })
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  return !isLoggedIn(currentUser) ? (
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
                class="text-slate-800 h-13 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
                onClick={(openForgotPassword)}
              >
                Forgot Password?
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    (sendToHome(),
      (
          <div>
          <h1>User is already logged in!</h1>
          </div>
      ))
  );
};

export default Login;
