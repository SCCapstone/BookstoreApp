import axios from "axios";
import React from "react";
import swal from 'sweetalert2';

export default class verifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            newPassword2: ""
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((state) => ({
            [name]: value
        }));
    };

    handleSubmit = e => {
        e.preventDefault();
        try {
            // temporary for right now but later redo this to use put commands instead of post
            const url = "/api/users/" + this.props.user._id;

            // hash the new password here
            let tempUser = { password: this.state.newPassword };
            if (tempUser.password.trim().length < 6) {
                swal.fire({
                    icon: 'error',
                    title: 'Password too short'
                });   
                return;
            }

            if (this.state.newPassword !== this.state.newPassword2) {
                swal.fire({
                    icon: 'error',
                    title: 'Passwords do not match'
                });   
                return;
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
        return (
            <div class="py-4">
                    <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1300px]">
                        Update Password
                    </div>
                
                <form class="w-full max-w-lg" onSubmit={this.handleSubmit}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                New Password
                            </label>
                            <input 
                                type="password"
                                name="newPassword" 
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                value={this.state.newPassword}
                                placeholder="Change Your Password"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Confirm New Password
                            </label>
                            <input 
                                type="password"
                                name="newPassword2" 
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                value={this.state.newPassword2}
                                placeholder="Confirm Your New Password"
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
        )
    }

}

