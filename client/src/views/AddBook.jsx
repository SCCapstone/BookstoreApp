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
      stock: 1,
      genre: [],
      inputGenres: "",
    };
  }

  potentialGenres = [
    "Action","Art","Biography","Children","Cooking","Fantasy","Graphic Novel","Guides","Historical Fiction","History","Horror","Humor","Mystery","Parenting","Religion and Spirituality","Romance","Science Fiction","Science","Self-Help","Thriller","Travel","True Crime","Young Adult"
  ];

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      [name]: value,
    }));
  };

  handleStock = (e) => {
    if (Number(e.target.value) > 999) {
      e.target.value = 999;
    }else if (Number(e.target.value) < 1){
      e.target.value = 1;
    }
    this.handleChange(e)
  };

  submit = (e) => {
    e.preventDefault();

    try {
      const url = "/api/books";
      let inputData = this.state;
      delete inputData.inputGenres;
      console.log(inputData);
      axios.post(url, inputData).then((res) => {
        if (res.status === 200 || res.status === 201) {
          swal.fire({
            icon: "success",
            title: "Successfully Added Book",
          });
        }
      });
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
      <section>
        <div class="pb-4 h-full text-gray-800 max-w-[1500px]">
          <div className="py-4">
            <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1400px]">
              Add Book
            </div>
          </div>
          <Grid container spacing={2} fullWidth sx={{ m: 1 }} >
            <Grid item xs={6}></Grid>
            <Grid class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6" fullWidth sx={{ m: 1 }}>
              <form>
                <Grid item ms={12} class="pb-3">
                  <TextField
                    fullWidth sx={{ m: 1 }}
                    variant="filled"
                    required
                    label="Title"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid fullWidth sx={{ m: 1 }}>
                  <h2>Choose an image for the book*</h2>
                  <FileBase64
                    type="file"
                    name="myImage" 
                    accept="image/png, image/jpeg"
                    multiple={false}
                    onDone={({ base64 }) => (this.state.imageId = base64)}
                  />
                </Grid>
                <TextField
                  fullWidth sx={{ m: 1 }}
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
                      fullWidth sx={{ m: 1 }}
                      variant="filled"
                      required
                      label="Summary"
                      placeholder="Summary"
                      name="summary"
                      value={this.state.summary}
                      multiline
                      rows={13}
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
                      fullWidth sx={{ m: 1 }}
                      {...params}
                      variant="filled"
                      label="Genres"
                      placeholder="Genres"
                    />
                  )}
                />
                <div className="flex pb-2 pt-2">
                    <TextField
                      variant="filled"
                      type="number"
                      name="stock"
                      label="Total Number of Books in the Inventory"
                      InputProps={{ inputProps: { min: "1", max: "999", step: "1" } }}
                      fullWidth sx={{ m: 1 }}
                      value={this.state.stock}
                      onChange={this.handleStock}
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

                <Grid fullWidth sx={{ m: 1 }}>
                  <div class="text-center lg:text-left grid pb-6">
                    <Button
                      fullWidth sx={{ m: 1 }}
                      class="py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                      onClick={this.submit}
                    >
                      SUBMIT
                    </Button>
                  </div>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </section>
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
