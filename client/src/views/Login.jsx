import React, { useState } from "react";
import axios from "axios";

const Login = () => {
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
      console.log(res.data.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("userID", res.data.userID);
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
          <form class="justify-center">
            <div class="mb-6">
              <input
                type="text"
                name="email"
                value={data.email}
                class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                placeholder="Enter Email"
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
            </div>



            <div class="text-center lg:text-left grid pb-6">
              <button
                type="button"
                class="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                onClick={login}
              >
                Login
              </button>
            </div>

            <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
              <a
                href="/create_account"
                class="text-slate-800 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
              >
                Register
              </a>

              <a
                href="/forgot_password"
                class="text-slate-800 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
