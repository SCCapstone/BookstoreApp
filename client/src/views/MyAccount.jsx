import React, { Component }  from "react";
import axios from "axios";
import swal from 'sweetalert2';
import { isLoggedIn, sendToLogin } from "../utils/PermissionUtils";

export default class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    async componentDidMount() {
        const url = "/api/users/" + this.props.currentUser;

        await axios.get(url).then(res => {
            let user = res.data;
            user.password = "";

            this.setState((state) => ({
                user: user 
            }));
        });
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        let tempUser = this.state.user;
        tempUser[name] = value;
        this.setState((state) => ({
            user: tempUser
        }));
    };
    
    handleSubmit = e => {
        e.preventDefault();
        try {
            // temporary for right now but later redo this to use put commands instead of post
            const url = "/api/users/" + this.state.user._id;

            // hash the new password here
            let tempUser = this.state.user;
            if (tempUser.password === "") {
                delete tempUser.password;
            }

            // axios call to update user
            axios.put(url, tempUser).then(res => {
                if (res.status === 200) {
                    swal.fire({
                        icon: 'success',
                        title: 'Successfully Updated User'
                    });    
                }
            });

        } catch (error) {
            // show error
            console.log(error);
            swal.fire({
                icon: 'error',
                title: 'Try Again Later',
                text: error.text,
            });
        }
    }
    
    render() {
        return isLoggedIn(this.props.currentUser) ? (
            <div class="py-4">
                    <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1300px]">
                        My Account Profile
                    </div>
                
                <form class="w-full max-w-lg" onSubmit={this.handleSubmit}>
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
                                maxLength={30}
                                placeholder=" "
                                onChange={this.handleChange}
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
                                maxLength={30}
                                placeholder=" "
                                onChange={this.handleChange}
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
                                placeholder=" "
                                onChange={this.handleChange}
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
                                placeholder="Change Your Password..."
                                onChange={this.handleChange}
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
        ) : (
            (sendToLogin(),
            (
                <div>
                <h1>Restricted to authenticated users only!</h1>
                </div>
            ))
        );
    }
}
