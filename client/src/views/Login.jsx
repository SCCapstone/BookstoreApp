import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const login = async (e) => {
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
    <div class="pb-4 h-full text-gray-800 max-w-[1400px]">
      <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
        <div />
        <div class="w-full py-16 gap-2 ">
          <div class="pb-4">
            <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
              Login
            </div>
          </div>
          <form class="justify-center space-y-4">
            {/* <TextField
                name="email"
                value={data.email}
                className="form-control placeholder-black block w-full px-4 py-4 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                placeholder="Enter Email"
                onChange={handleChange}
                error={false}
                helperText=""
              />

              <TextField
                type="password"
                name="password"
                value={data.password}
                className="form-control text-black placeholder-black block w-full px-4 py-4 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                placeholder="Enter Password"
                error={false}
                onChange={handleChange}
                helperText=""
              /> */}

            <TextField label="Enter Email" color="primary" />
            <TextField
              type="password"
              name="password"
              value={data.password}
              label="Enter Password"
              error={false}
              onChange={handleChange}
              helperText=""
              className="max-w-[50%]"
            />

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
                href="/create-account"
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
