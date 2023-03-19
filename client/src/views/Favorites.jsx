import React, { Component } from "react";
import axios from "axios";

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        };
    };

    async componentDidMount() {
        const url = "/api/users/" + this.props.currentUser;

        await axios.get(url).then(res => {
            const user = res.data;
            let favorites = [];

            if (user.favorites && user.favorites > 0) {
                favorites = user.favorites;
            }

            this.setState((state) => ({
                favorites: favorites
            }));
        });
    };

    getBook(bookName) {
        for (let i = 0; i < this.state.favorites.length; ++i) {
            if (this.state.favorites[i].title === bookName) {
                // console.log(books[i]);
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
                <div className="grid grid-cols-1 grid-flow-row min-w-[1100px] max-w-screen">
                    <div
                    className={`flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex-row flex-wrap sm:mb-20 mb-6`}
                    >
                    {this.getKeys(this.favoriteTitles()).map((bookName) => (
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