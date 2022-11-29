// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const useForm = (validate) => {
//   const [values, setValues] = useState({
//     firstName: "",
//     lastName: "",
//     birthDate: "",
//     phoneNumber: "",
//     userName: "",
//     email: "",
//     password: "",
//     password2: "",
//   });
//   const [errors, setErrors] = useState({});

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setValues({
// //       ...values,
// //       // [e.target.name]: e.target.value
// //       // not need beacuse of const {name, value} = e.target
// //       [name]: value,
// //     });
// //   };

//   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const url = "http://localhost:3001/api/users";
// //       const { data: res } = await axios.post(url, values);
// //       navigate("/login");
// //       console.log(res.message);
// //     } catch (error) {
// //       if (error.response?.status >= 400 && error.response.status <= 500) {
// //         setErrors(error.response.data.message);
// //       }
// //     }

// //     setErrors(validate(values));
// //   };

//   return { values, errors };
// };

// export default useForm;
