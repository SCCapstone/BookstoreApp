//const array which contains all the books in the inventory 
//each book is designated by the title, author (first and last name), imageId (png picture from the Books folder), a little summanry about the book, the quality of the book through the stars, the price, stock, genre, how many copies of the book have been sold so far, and the date
//all of these are hard-coded initially for each book in the inventory
const books = [
  {
    title: "Steve Jobs",
    author: "Walter Issacson",
    imageId: require("./Books/stevejobs.png"),
    summary:
      "SJ A genius book about an incredible mind, yadda yadda blah blah blah lots of gushing and awing because I like books.",
    link: "/Walter Issacson/Steve Jobs",
    stars: 3,
    price: 12.5,
    stock: 40,
    genre: "",
    quantitySold: "6",
    date: "2006-08-25",
  },
  {
    title: "Go-To-Dinners",
    author: "Ina Garten",
    imageId: require("./Books/gotodinners.png"),
    summary:
      "GTD A genius book about an incredible mind, yadda yadda blah blah blah lots of gushing and awing because I like books.",
    link: "/Ina Garten/Go-To-Dinners",
    stars: 3,
    price: 120.99,
    stock: 40,
    genre: "",
    quantitySold: "3",
    date: "2020-03-23",
  },
  {
    title: "How Easy is That?",
    author: "Ina Garten",
    imageId: require("./Books/howeasyisthat.png"),
    summary:
      "HET A genius book about an incredible mind, yadda yadda blah blah blah lots of gushing and awing because I like books.",
    link: "/Ina Garten/How Easy is That",
    stars: 3,
    price: 15.99,
    stock: 40,
    genre: "",
    quantitySold: "23",
    date: "2022-04-11",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Bronte",
    imageId: require("./Books/janeeyre.png"),
    summary:
      "JE A genius book about an incredible mind, yadda yadda blah blah blah lots of gushing and awing because I like books.",
    link: "/Charlotte Bronte/Jane Eyre",
    stars: 3,
    price: 16.99,
    stock: 40,
    genre: "",
    quantitySold: "43",
    date: "2016-06-01",
  }
];

export default books;