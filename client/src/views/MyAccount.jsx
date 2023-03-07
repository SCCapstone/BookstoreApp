import React, { useState, Component }  from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom"

class MyAccount extends Component {
    // using ID in localStorage, fetch data from Mongo and put it in the verified users page so that it can be connected to current user
    // password needs to be hashed

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: 'chad',
                lastName: ''
            }
        };
    }

    async componentDidMount() {
        const url = "/api/users/" + this.props.currentUser;
        console.log(this.props.currentUser);
        await axios.get(url).then(res => {
            const user = res.data;
            this.setState((state) => ({
                user: user 
            }));
            this.user = user;
            console.log(user);
        })
        console.log(this.state.user);
        console.log(this.user);
    }

    componentWillUnmount() {

    }
    
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData({
    //         ...data,
    //         [name]: value,
    //     });
    // };
    
    async handleSubmit(e) {
        e.preventDefault();
        try {
        // temporary for right now but later redo this to use put commands instead of post
          const url = "/api/users/" + this.state.user;
          console.log(url);
        //   // hash the new password here
        //   if (data.password === "") {
        //     delete data.password;
        //   }
        //   console.log(data);
        //   const res = await axios.put(url, data);
        //   window.location.reload();
        } catch (error) {
          console.log(error);
        //   if (error.response?.status >= 400 && error.response.status <= 500) {
        //     setError(error.response.data.message);
        }
    }
    
    render() {
        return (
            <div class="py-4">
                    <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1300px]">
                        My Account Profile
                    </div>
                
                <form class="w-full max-w-lg" /*onSubmit={handleSubmit}*/>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                value={this.state.user.firstName}
                                // maxLength={30}
                                // placeholder=" "
                                // onChange={handleChange}
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
                                value={this.state.user.lastName}
                                // maxLength={30}
                                // placeholder=" "
                                // onChange={handleChange}
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
                                value={this.state.user.email}
                                // placeholder=" "
                                // onChange={handleChange}
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
                                value={this.state.user.password}
                                // placeholder="Change Your Password..."
                                // onChange={state.}
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
        )
    }
}

export default MyAccount;
