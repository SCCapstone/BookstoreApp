import React, { Component } from "react";
import axios from "axios";
import books from "./Books.js";

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritesIds: [],
            favorites: []
        };
    };

    async componentDidMount() {
        this.setState((state) => ({
            favorites: books
        }));
        const url = "/api/users/" + this.props.currentUser;

        await axios.get(url).then(res => {
            const user = res.data;
            let favoritesIds = [];

            if (user.favorites && user.favorites > 0) {
                favoritesIds = user.favorites;
            }
            console.log(favoritesIds);
            this.setState((state) => ({
                favoritesIds: favoritesIds
            }));
        });

        if (!this.state.favoritesIds || this.state.favoritesIds.length === 0) return;

        const bookUrl = "/api/books/" + this.state.favoritesIds;
        await axios.get(bookUrl).then(res => {
            let favoriteBooks = res.data;
            
            if (!res.data || res.data.length === 0) {
                favoriteBooks = books;
            }

            console.log(this.favoriteBooks);
            this.setState((state) => ({
                favorites: favoriteBooks
            }));
        })
    };

    getBook(bookName) {
        console.log(bookName);
        for (let i = 0; i < this.state.favorites.length; ++i) {
            if (this.state.favorites[i].title === bookName) {
                // console.log(books[i]);
                console.log(this.state.favorites[i]);
                return this.state.favorites[i];
            }
        }
    }

    iterate(iterable, callback) {
        for (var key in iterable) {
          if (
            key === "length" ||
            key === "prototype" ||
            !Object.prototype.hasOwnProperty.call(iterable, key)
          )
            continue;
            callback(iterable[key], key, iterable);
        }
    }

    getKeys(obj) {
        var keys = [];
        this.iterate(obj, function (oVal, oKey) {
            keys.push(oKey);
        });
        return keys;
    }

    favoriteTitles() {
        console.log(this.state.favorites);
        return this.state.favorites.map(x => x.title);
    }

    anyFavorites() {
        return this.state.favorites.length > 0;
    }

    render() {
        return this.anyFavorites() ? (
            <div class="py-6">
                <div className="grid grid-cols-1 grid-flow-row min-w-[1100px] max-w-screen">
                    <div
                    className={`flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex-row flex-wrap sm:mb-20 mb-6`}
                    >
                    {this.favoriteTitles().map((bookName) => (
                        <div
                        className={`flex-1 flex justify-start items-center flex-row m-3`}
                        >
                        <div class="min-w-[80px] max-w-[120px]">
                            <img
                            src={this.getBook(bookName).imageId}
                            alt=""
                            className="row-span-2 border-2 justify-right"
                            />
                        </div>
                        <div>
                            <h3 className="font-poppins font-bold xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] ml-3">
                            {this.getBook(bookName).title} by{" "}
                            {this.getBook(bookName).author}
                            </h3>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        ) : <div>
            You have no favorites!
        </div>;
    }
}