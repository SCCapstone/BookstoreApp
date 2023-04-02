import React, { Component, useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { Chip, Avatar, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Remove, Add } from "@mui/icons-material";
import swal from "sweetalert2";

function getBase64() {
  var file = "./Books/default.jpg";
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      price: 1,
      summary: "",
      stars: 0,
      quantitySold: 0,
      imageId: "",
      stock: 999,
      genre: [],
      inputGenres: "",
    };
  }

  potentialGenres = [
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
    "Science",
  ];

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      [name]: value,
    }));
  };

  submit = (e) => {
    e.preventDefault();

    try {
      const url = "/api/books";
      let inputData = this.state;
      delete inputData.inputGenres;
      axios.post(url, inputData).then((res) => {
        if (res.status === 200 || res.status === 201) {
          swal.fire({
            icon: "success",
            title: "Successfully Added Book",
          });
        }
      });
      // localStorage.setItem("token", res.data);

      // TO-DO: SET LOCATION TO BROWSE - RECENTLY ADDED
      // window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response?.status >= 400 && error.response.status <= 500) {
        // setError(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

  isLoggedIn = () => {
    const currentUser = this.props.currentUser;
    return currentUser && currentUser.length !== 0;
  };

  sendToLogin = () => {
    window.location.href = "/login";
  };

  render() {
    return this.isLoggedIn() ? (
      <Grid container spacing={2}>
        <Grid item xs={12} className="justify-center py-5">
          <span class="text-center px-16 py-16 text-lg">Add Book</span>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
          <form>
            <Grid item ms={12} class="pb-3">
              <TextField
                variant="filled"
                required
                label="Title"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </Grid>
            <h2>Choose an image for the book *</h2>
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => (this.state.imageId = base64)}
            />
            <TextField
              variant="filled"
              required
              label="Author"
              placeholder="Author"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <FormControl fullWidth sx={{ m: 1 }} variant="filled" required>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <FilledInput
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Price"
                type="number"
                name="price"
                data={this.state.price}
                onChange={this.handleChange}
              />
            </FormControl>
            <TextField
              variant="filled"
              required
              label="Summary"
              placeholder="Summary"
              name="summary"
              value={this.state.summary}
              multiline
              rows={3}
              onChange={this.handleChange}
            />
            <Autocomplete
              multiple
              name="genre"
              value={this.state.genre}
              onChange={(event, newValue) => {
                this.setState((state) => ({
                  genre: newValue,
                }));
              }}
              inputValue={this.state.inputGenres}
              onInputChange={(event, newInputValue) => {
                this.setState((state) => ({
                  inputGenres: newInputValue,
                }));
              }}
              options={this.potentialGenres}
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
                  <Avatar
                    onClick={() =>
                      this.handleChange({
                        target: { name: "stock", value: this.state.stock - 1 },
                      })
                    }
                  >
                    <Remove />
                  </Avatar>
                }
                label={<p className="px-2 text-lg ">{this.state.stock}</p>}
                clickable
                onDelete={() =>
                  this.handleChange({
                    target: { name: "stock", value: this.state.stock + 1 },
                  })
                }
                deleteIcon={<Add />}
              />
              <button
                className="pl-4"
                onClick={() =>
                  this.handleChange({ target: { name: "stock", value: 0 } })
                }
              >
                {" "}
                Clear{" "}
              </button>
            </div>

            <div class="text-center lg:text-left grid pb-6">
              <Button
                class="py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                onClick={this.submit}
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    ) : (
      (this.sendToLogin(),
      (
        <div>
          <h1>Restricted to authenticated users only!</h1>
        </div>
      ))
    );
  }
}

export default AddBook;
