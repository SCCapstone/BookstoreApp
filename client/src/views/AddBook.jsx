//imports
import React, { Component } from "react";
import ReactImageFileToBase64 from "react-file-image-to-base64";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import swal from "sweetalert2";
import { isAdmin, sendToHome } from "../utils/PermissionUtils";

{/* This is the add book where it is only restricted to employees/admin and they can add a book to the inventory*/}

//takes in a props constructor, a state, title, author, price which is initially set to 1, summary, stars which is initially set to 0
//quantity sold which is also set to 0, the imageID which is the book image, stock which is set to 1 initially, genre which is an arry
//the input genre, and image title
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
      imageTitle: "",
    };
  }

  //array for storing the potential genres - is in alphabetical order 
  potentialGenres = [
    "Action",
    "Art",
    "Biography",
    "Children",
    "Cooking",
    "Fantasy",
    "Graphic Novel",
    "Guides",
    "Historical Fiction",
    "History",
    "Horror",
    "Humor",
    "Mystery",
    "Parenting",
    "Religion and Spirituality",
    "Romance",
    "Science Fiction",
    "Science",
    "Self-Help",
    "Thriller",
    "Travel",
    "True Crime",
    "Young Adult",
  ];

  //this function handles the change given the name and the value in this case adding a new book
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      [name]: value,
    }));
  };

  // This function handles the stock number for the number of books in our inventory
  handleStock = (e) => {
    if (Number(e.target.value) > 999) {
      e.target.value = 999;
    } else if (Number(e.target.value) < 1) {
      e.target.value = 1;
    }
    this.handleChange(e);
  };

  // The following function converts the uploaded image to base64 and prepares it to before its sent to the database.
  handleImage = (e) => {
    // ensure file size is less than 200KB. If greater, error and return
    if (e[0].default_file.size > 200000) {
      swal.fire({
        icon: "error",
        title: "File Size Too Large",
        text: `Max file size is 200 KB, current file size is ${e[0].file_size}`
      });
      return;
    }
    let base64File = e[0].base64_file;
    let imageTitle = e[0].file_name;
    //set to new file
    this.setState((state) => ({
      imageId: base64File,
      imageTitle: imageTitle,
    }));
  };

  //in a try catch method to submit a book. If true then a swal happens alerting that it was successful adding a book
  //if false then an error response appears in the console log
  submit = (e) => {
    e.preventDefault();

    try {
      const url = "/api/books";
      let inputData = this.state;
      delete inputData.inputGenres;
      delete inputData.imageTitle;
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

  //only render if admin 
  render() {
    return isAdmin(this.props.role) ? (
      <section>
        <div class="pb-4 h-full text-gray-800 max-w-[1500px]">
          <div className="py-4">
            {/* title of the screen */}
            <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1400px]">
              Add Book
            </div>
          </div>
          <Grid container spacing={2} fullWidth sx={{ m: 1 }}>
            <Grid item xs={6}></Grid>
            <Grid
              class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6"
              fullWidth
              sx={{ m: 1 }}
            >
              {/* grid form for filling out the information pertaining to adding a book */}
              <form>
                {/* title of the book */}
                <Grid item ms={12} class="pb-3">
                  <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    variant="filled"
                    required
                    label="Title"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Grid>
                {/* choosing an image for the corresponding book *must be in png or jpeg format and must be 200KB or less size limit */}
                <Grid fullWidth sx={{ m: 1 }}>
                  <h2>
                    Choose an image for the book - must be in .png or .jpeg* and must be 200KB or less
                  </h2>
                  <ReactImageFileToBase64
                    name="myImage"
                    multiple={false}
                    onCompleted={this.handleImage}
                  />
                  <span>{this.state.imageTitle}</span>
                </Grid>
                {/* author of the book */}
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
                  variant="filled"
                  required
                  label="Author"
                  placeholder="Author"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleChange}
                />
                {/* price of the book */}
                <FormControl fullWidth sx={{ m: 1 }} variant="filled" required>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
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
                {/* summary of the book */}
                <TextField
                  fullWidth
                  sx={{ m: 1 }}
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
                {/* autocomplete of the genre of the book based on the array created above */}
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
                      fullWidth
                      sx={{ m: 1 }}
                      {...params}
                      variant="filled"
                      label="Genres"
                      placeholder="Genres"
                    />
                  )}
                />
                {/* stock of the number of books in the inventory */}
                <div className="flex pb-2 pt-2">
                  <TextField
                    variant="filled"
                    type="number"
                    name="stock"
                    label="Total Number of Books in the Inventory"
                    InputProps={{
                      inputProps: { min: "1", max: "999", step: "1" },
                    }}
                    fullWidth
                    sx={{ m: 1 }}
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
                
                {/* submit button to submit the add book form */}
                <Grid fullWidth sx={{ m: 1 }}>
                  <div class="text-center lg:text-left grid pb-6">
                    <Button
                      fullWidth
                      sx={{ m: 1 }}
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
      {/* renders to the home page once added and must be a restricted personale of the bookstore */}
      (sendToHome(),
      (
        <div>
          <h1>Restricted to administrators only!</h1>
        </div>
      ))
    );
  }
}

export default AddBook;
