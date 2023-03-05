import React, { useState, initialState }  from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const MyAccount = ({ currentUser }) => {
    // using ID in localStorage, fetch data from Mongo and put it in the verified users page so that it can be connected to current user
    // password needs to be hashed

    const getUserData = async() => {
        const url = "/api/users/" + currentUser;
        const res = await axios.get(url, data);
        return res.data;
    }

    const [data, setData] = useState(getUserData);
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
        try {
        // temporary for right now but later redo this to use put commands instead of post
          const url = "/api/users/" + currentUser;
          // hash the new password here
          if (data.password === "") {
            delete data.password;
          }
          console.log(data);
          const res = await axios.put(url, data);
          window.location.reload();
        } catch (error) {
          console.log(error);
          if (error.response?.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
          }
        }
      };
    
    return (
        <div class="py-4">
                <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1300px]">
                    My Account Profile
                </div>
                <div className="row justify-content-around mt-5 user-info">
                    <div className="col-12 col-md-3">
                        <figure className='avatar avatar-profile'>
                            <img 
                            className="rounded-circle img-fluid" 
                            src= ''
                            alt= '' 
                            />
                        </figure>
                    </div>
                    
                    <div className="col-12 col-md-5">
                        <h4>Full Name:</h4>
                        <p>{ data.firstName }{ data.lastName }</p>
                        <h4>Email:</h4>
                        <p>{ data.email }</p>

                    </div>
                </div>

                <div class="text-center text-black text-3xl rounded py-3 max-w-[1300px]">
                    <a href="#" id="edit_account" className="btn btn-primary btn-block my-1">
                        Edit Account
                    </a> 
                </div> 

            <form class="w-full max-w-lg" onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            value={data.firstName}
                            maxLength={30}
                            placeholder=" "
                            onChange={handleChange}
                        />
                        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName" 
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"   
                            value={data.lastName}
                            maxLength={30}
                            placeholder=" "
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Email
                        </label>
                        <input 
                            type="text" 
                            name="email"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"   
                            value={data.email}
                            placeholder=" "
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Password
                        </label>
                        <input 
                            type="password"
                            name="password" 
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            value={data.password}
                            placeholder="Change Your Password..."
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div href="/updateProfile" class="text-center lg:text-left grid pb-6">
                    <button type="submit" class="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyAccount;
