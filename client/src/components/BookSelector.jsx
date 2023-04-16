import React, { Component } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default class BookSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
          book: null,
          inputBook: null,
        };
    };

    filterOptions = (options, state) => {
        let newOptions = [];
        options.forEach((element) => {
          const baseTitle = element.title.replace(",", "").toLowerCase();
          const baseAuthor = element.author.replace(",", "").toLowerCase();
          let baseGenre = "";
          if (element.genre.length > 0) {
            baseGenre = element.genre[0]?.replace(",","").toLowerCase();
          }
          const baseInput = state.inputValue.toLowerCase();
          if (baseTitle.includes(baseInput) ||
              baseAuthor.includes(baseInput) ||
              baseGenre.includes(baseInput))
            newOptions.push(element);
        });
        return newOptions;
    };

    render() {
        return (
            <Autocomplete
                className="rounded border bg-white py-2 max-w-[1158px] px-4 w-[500px] xl:w-[1100px] lg:w-[600px] md:w-[500px]"
                value={this.state.book}
                onChange={(event, newValue) => {
                window.location = `/${newValue.author}/${newValue.title}`;
                this.setState((state) => ({
                    book: newValue
                }));
                }}
                inputValue={this.state.inputBook}
                onInputChange={(event, newInputValue) => {
                    this.setState((state) => ({
                        inputBook: newInputValue
                    }));
                }}
                options={this.props.books}
                getOptionLabel={(option) => option.title}
                groupBy={(option) => {
                    if (option.genre.length > 0) {
                        return option.genre[0];
                    }
                    else return option.title;
                }}
                filterOptions={this.filterOptions}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        // label="Search"
                        placeholder="Search Books"
                    />
                )}
            />
        )
    }

}

