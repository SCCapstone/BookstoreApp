import { useState, useEffect } from "react";

const useForm = (validate) => {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        birthdate: "",
        phonenumber: "",
        username: "",
        email: "",
        password: "",
        password2: ""
    })
    const [errors, setErrors] = useState({

    })

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            // [e.target.name]: e.target.value
            // not need beacuse of const {name, value} = e.target
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        setErrors(validate(values));
    }

    return {handleChange, values, handleSubmit, errors};
}

export default useForm;