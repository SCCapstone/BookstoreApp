import axios from "axios";
import React from "react";
import swal from 'sweetalert2';
import { Button } from '@mui/material'

export default class verifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        // this is where the change to TRUE for validated emails goes
    }

    render() {
        return (
        )
    }

}

