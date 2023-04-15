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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      [name]: value,
    }));
  };

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
    let base64txt = e[0].base64_file;
    let base64File = base64txt.substring(base64txt.indexOf("base64") + 7);
    base64File = "data:" + e[0].file_type + ";base64," + base64File;
    let imageTitle = e[0].file_name;
    this.setState((state) => ({
      imageId: base64File,
      imageTitle: imageTitle,
    }));
  };

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

  render() {
    return isAdmin(this.props.role) ? (
      <section>
        <div class="pb-4 h-full text-gray-800 max-w-[1500px]">
          <div className="py-4">
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
              <form>
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
                <Grid fullWidth sx={{ m: 1 }}>
                  <h2>
                    Choose an image for the book - must be in .png or .jpeg*
                  </h2>
                  <ReactImageFileToBase64
                    name="myImage"
                    multiple={false}
                    onCompleted={this.handleImage}
                  />
                  <span>{this.state.imageTitle}</span>
                </Grid>
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
