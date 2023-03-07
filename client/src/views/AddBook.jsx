import { React, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { Chip, Avatar, Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Remove, Add } from "@mui/icons-material";
import swal from 'sweetalert2';

const AddBook = (user) => {
    const [data, setData] = useState({
        title: "",
        author: "",
        price: 1,
        summary: "",
        genre: []
    });
    
    const [error, setError] = useState("");

    const potentialGenres = [
        "Fantasy",
        "Science Fiction",
        "Action",
        "Mystery",
        "Horror",
        "Thriller",
        "Historical Fiction",
        "Romance",
        "Graphic Novel",
        "Young Adult",
        "Children",
        "Biography",
        "Cooking",
        "Art",
        "Self-Help",
        "History",
        "Travel",
        "True Crime",
        "Humor",
        "Guides",
        "Religion and Spirituality",
        "Parenting",
        "Science"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const addGenre = (e) => {
        console.log(e.target);
        const { value } = e.target;
        setData({
            ...data,
            ["genre"]: value,
        });
    };

    const [stock, setStock] = useState(1);

    function addStock(stock) {
        setStock(stock + 1);
    };
    
    function subtract(stock) {
        if (stock > 0) {
            setStock(stock - 1);
        }
    };

    function clearStock() {
        let q = 0
        setData({
            stock: q,
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            let inputData = data;
            inputData.price = Number(data.price);
            inputData.stock = stock;
            inputData.stars = 0;
            inputData.quantitySold = 0;
            inputData.imageId = "This doesn't work if empty, fix later";
            const url = "/api/books";
            console.log(inputData);
            // const { data: res } = await axios.post(url, inputData).then(res => {
            //     if (res.status = 200) {
            //         swal.fire({
            //             icon: "success",
            //             title: "Successfully Added Book"
            //         })
            //     }
            // });
            // localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            console.log(error);
            if (error.response?.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
            }
        }
    };

    const isLoggedIn = () => {
        // console.log('wassup');
        const currentUser = user.currentUser;
        // console.log(currentUser && currentUser.length !== 0);
        // console.log(user);
        return currentUser && currentUser.length !== 0;
    };

    const sendToLogin = () => {
        window.location.href = "/login";
    };

    return isLoggedIn() ? (
    <Grid container spacing={2}>
        <Grid item xs={12} className="justify-center py-5">
            <span class="text-center px-16">Add Book</span>
        </Grid>
        <Grid item xs={6}>
            
        </Grid>
        <Grid class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
            <form>
                <Grid item ms={12} class="pb-3">
                    <TextField
                        variant="filled"
                        required
                        label="Title"
                        placeholder="Title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                </Grid>
                <TextField
                    variant="filled"
                    required
                    label="Author"
                    placeholder="Author"
                    name="author"
                    value={data.author}
                    onChange={handleChange}
                />
                <FormControl fullWidth sx={{ m: 1 }} variant="filled" required>
                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                    <FilledInput
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Price"
                        type="number"
                        name="price"
                        data={data.price}
                        onChange={handleChange}
                    />
                </FormControl>
                <TextField
                    variant="filled"
                    required
                    label="Summary"
                    placeholder="Summary"
                    name="summary"
                    value={data.summary}
                    multiline
                    rows={3}
                    onChange={handleChange}
                />
                <Autocomplete
                    multiple
                    name="genre"
                    value={data.genre}
                    onChange={addGenre}
                    options={potentialGenres}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Genres"
                            placeholder="Genres"
                        />
                    )}
                />
                <div className="flex pb-2 pt-2">
                    <Chip 
                        avatar={
                            <Avatar onClick={() => subtract(stock)}>
                            <Remove />
                            </Avatar>
                        }
                        label={
                            <p className="px-2 text-lg ">{stock}</p>
                        }
                        clickable
                        onDelete={() => addStock(stock)}
                        deleteIcon={<Add />}
                    />
                    <button className="pl-4" onClick={() => clearStock()}>
                        {" "}
                        Clear{" "}
                    </button>
                </div>

                <div class="text-center lg:text-left grid pb-6">
                    <Button
                        class="py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                        onClick={submit}
                    >
                        SUBMIT
                    </Button>
                </div>
            </form>
        </Grid>
    </Grid>
    ) : (
        (sendToLogin(),
      (
        <div>
          <h1>Restricted to authenticated users only!</h1>
        </div>
      ))
    );
};

export default AddBook;
