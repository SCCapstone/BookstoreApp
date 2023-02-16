import { React, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";

const AddBook = () => {
    const [data, setData] = useState({
        title: "",
        author: "",
        price: 0,
        quantity: 0,
        });
        const [error, setError] = useState("");

        const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const url = "/api/auth";
            // const { data: res } = await axios.post(url, data);
            // localStorage.setItem("token", res.data);
            // window.location = "/";
        } catch (error) {
            console.log(error);
            if (error.response?.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
            }
        }
    };

    return (
    <Grid container spacing={2}>
        <Grid item xs={12} className="justify-center py-5">
            <span class="text-center px-16">Add Book</span>
        </Grid>
        <Grid item xs={6}>
            
        </Grid>
        <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
            <form class="justify-center">
                <div class="mb-6">
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                        placeholder="Title"
                        onChange={handleChange}
                    />
                </div>
                <div class="mb-6">
                    <input
                        type="text"
                        name="author"
                        value={data.author}
                        class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                        placeholder="Author"
                        onChange={handleChange}
                    />
                </div>
                <div class="mb-6">
                    <input
                        type="number"
                        name="price"
                        value={data.price}
                        class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                        placeholder="Price"
                        onChange={handleChange}
                    />
                </div>
                <div class="mb-6">
                    <input
                        type="number"
                        name="quantity"
                        value={data.quantity}
                        class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                        placeholder="Quantity"
                        onChange={handleChange}
                    />
                </div>

                <div class="text-center lg:text-left grid pb-6">
                    <Button
                        class="py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                        onClick={submit}
                    >
                        SUBMIT
                    </Button>
                </div>

                <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
                    <Button
                        href="/create-account"
                        class="text-slate-800 h-13 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
                    >
                        Register
                    </Button>

                    <Button
                        href="/forgot-password"
                        class="text-slate-800 h-13 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
                    >
                        Forgot Password?
                    </Button>
                </div>
            </form>
        </div>
    </Grid>
    );
};

export default AddBook;
