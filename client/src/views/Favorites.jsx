import React, { Component } from "react";
import axios from "axios";

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritesIds: [],
            favorites: []
        };
    };

    async componentDidMount() {
        const url = "/api/users/" + this.props.currentUser;

        await axios.get(url).then(res => {
            const user = res.data;
            let favIds = [];
            if (user.favorites && user.favorites.length > 0) {
                favIds = user.favorites;
            }
            this.getFavorites(favIds);
        }).catch(function error(e) {
            console.log(e);
        });
    };

    async getFavorites(favIds) {
        if (!favIds || favIds.length === 0) return;

        const bookUrl = "/api/books/" + favIds;
        await axios.get(bookUrl).then(res => {
            let favoriteBooks = res.data;
            if (!res.data || res.data.length === 0) {
                favoriteBooks = [];
            }

            this.setState((state) => ({
                favorites: favoriteBooks
            }));
        });
    }

    getBook(bookName) {
        for (let i = 0; i < this.state.favorites.length; ++i) {
            if (this.state.favorites[i].title === bookName) {
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
        return this.state.favorites.map(x => x.title);
    }

    anyFavorites() {
        return this.state.favorites.length > 0;
    }

    render() {
        return this.anyFavorites() ? (
            <div class="py-6">
                <div class="sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1150px] xl:max-w-[1200px] max-w-[200px]">
                    <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
                    Wishlist
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-flow-row min-w-[1100px] max-w-screen">
                    <div
                    className={`flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex-row flex-wrap sm:mb-20 mb-6`}
                    >
                    {this.favoriteTitles().map((bookName) => (
                        <div className="border-2 border-gainsboro hover:border-black">
                        <a 
                            href={`/${this.getBook(bookName).author}/${this.getBook(bookName).title}/`} 
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
                        </a>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        ) : <div className="mt-10">
            You have no books on your wishlist!
        </div>;
    }
}