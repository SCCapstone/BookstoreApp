import  React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import emailjs from "@emailjs/browser"; 

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "customer",
    balance: 0,
    favorites: [],
    verifyEmailToken: "",
    updatePasswordToken: "nahfam",
    emailVerified: false
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
    data.verifyEmailToken = uuidv4();
    try {
      const url = "/api/users";
      const form = {
        to_name: data.firstName + " " + data.lastName,
        to_email: data.email,
        link: "http://bookstore-app.herokuapp.com/validate/" + data.verifyEmailToken,
      };
      const res = await axios.post(url, data);
      emailjs.send(
        "service_ddw3f6r",
        "template_pkc6crh",
        form,
        "MEck6kXn4BPEa6daF"
      ).then(
        navigate("/login")
      );
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
              Sign up
            </div>
          </div>
          <form class="justify-center" onSubmit={handleSubmit}>
            <div class="mb-6">
              <input
                type="text"
                name="firstName"
                class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                value={data.firstName}
                maxLength={30}
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>

            <div class="mb-6">
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                maxLength={30}
                class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>

            <div class="mb-6">
              <input
                type="text"
                name="email"
                value={data.email}
                class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </div>

            <div class="mb-6">
              <input
                type="password"
                name="password"
                value={data.password}
                class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div class="text-center lg:text-left grid pb-6">
              <button
                type="submit"
                class="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
              >
                Sign Up
              </button>
            </div>

            <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
              Already have an account?
              <a
                href="/login"
                class="text-center text-slate-800 font-semibold hover:text-black bg-polished_pine rounded p-2 border-2"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
}

export default SignUp;
