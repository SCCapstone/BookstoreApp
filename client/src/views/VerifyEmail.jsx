import axios from "axios";
import React from "react";
import swal from 'sweetalert2';
import { Button } from '@mui/material'

{/* Verify Email is to make sure users register and have a correct email which will ensure incase they forget their password */}

//utilizes the react component library and takes in an email verified and sets to true initially for the state, also takes a props constructor
export default class verifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailVerified: true,
        };
    }

    //handle submit to make sure the email is correct and verified
    handleSubmit = e => {
        e.preventDefault();
        // this is where the change to TRUE for validated emails goes
        const userID = this.props.user._id;
        try {
            const url = "/api/users/" + userID;
            const temp = {
                emailVerified: this.state.emailVerified,
            }
            //axios call and sends a swal if the email is verified with a success
            axios.put(url, temp).then(res => {
                if (res.status === 200) {
                    swal.fire({
                        icon: 'success',
                        title: 'Email Verified'
                    });
                }
            });
            //if the email not verified sends an error message through the swal
        } catch(error) {
            swal.fire({
                icon: 'error',
                title: 'Could not verify your email address',
                text: error.text,
            });
        }
    }

    //renders to verify the email
    render() {
        return (
            <Button variant="contained" onClick={this.handleSubmit}>Verify My Email</Button>
        )
    }

}

