import axios from "axios";
import React from "react";
import swal from 'sweetalert2';
import { Button } from '@mui/material'

export default class verifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailVerified: true,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        // this is where the change to TRUE for validated emails goes
        const userID = this.props.user._id;
        try {
            const url = "/api/users/" + userID;
            const temp = {
                emailVerified: this.state.emailVerified,
            }
            axios.put(url, temp).then(res => {
                if (res.status === 200) {
                    swal.fire({
                        icon: 'success',
                        title: 'Email Verified'
                    });
                }
            });
        } catch(error) {
            swal.fire({
                icon: 'error',
                title: 'Could not verify your email address',
                text: error.text,
            });
        }
    }

    render() {
        return (
            <Button variant="contained" onClick={this.handleSubmit}>Verify My Email</Button>
        )
    }

}

