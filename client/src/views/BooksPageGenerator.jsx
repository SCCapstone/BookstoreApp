import { React, useState } from "react";
import ReactStars from "react-stars";
import Heart from "react-heart";
import { Grid, Chip, Button, Icon } from "@mui/material";
import { Remove } from "@mui/icons-material"

const BooksPageGenerator = ({ book }) => {
  const [quantity, setQuantity] = useState(0);

  // Increase Quantity
  function add(quantity) {
    setQuantity(quantity + 1);
  }

  function subtract(quantity) {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  const [active, setActive] = useState(false);

  return (
<Grid container spacing={2}>
  <Grid item xs={12}>
    <span class="text-center text-3xl px-16">{book.name} by {book.author}</span>
  </Grid>
  <Grid item xs={4}>
    <div class="min-w-[100px]">
      <img src={book.image} alt="" className="row-span-2 border-2" />
    </div>
  </Grid>
  <Grid item xs={8}>
    <ul className="text-bold text-xl">{book.price}</ul>
    <ReactStars
      count={5}
      value={book.stars}
      size={24}
      edit={false}
      color1={"#000"}
      color2={"#c2b542"}
    />
    <ul>Quantity Available: {book.qty}</ul>
    <ul className="flex">
      Add to Wishlist: &nbsp;
      <span className="py-1">
        <Heart
          style={{ width: "20px" }}
          isActive={active}
          onClick={() => setActive(!active)}
          activeColor={"#404252"}
        />
      </span>
    </ul>
    <u>
      <a href="/">Check availability in stores near you</a>
    </u>
    <div className="flex">
    <Chip>
      <Icon>Remove</Icon>
      {/* <Button
        className="px-1 pb-2 hover:bg-persian_plum hover:text-gainsboro text-3xl"
        onClick={() => subtract(quantity)}
      >
        <Icon>Remove</Icon>
      </Button>
      <p className="px-2 pt-3 text-lg ">{quantity}</p>
      
      <Button
        className="px-1 pb-2 hover:bg-persian_plum hover:text-gainsboro text-3xl"
        onClick={() => add(quantity)}
      >
        +
      </Button> */}
    </Chip>
      <button className="pl-4" onClick={() => setQuantity(0)}>
        {" "}
        Clear{" "}
      </button>
    </div>

    <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
      <button class="text-slate-800 font-semibold hover:text-black focus:text-black bg-polished_pine rounded p-3 border-2">
        Add to cart
      </button>

      <button class="text-slate-800 font-semibold focus:text-black focus:bg-persian_plum rounded p-3 border-2">
        Instant Purchase
      </button>
    </div>
    <ul className="row-span-6" />
  </Grid>
  <Grid item xs={8}>
    <Chip >xs=8</Chip>
  </Grid>
      <div className="py-4 col-span-3">
        {/* <div class="grid text-center text-3xl py-3 max-w-[1300px] px-16">
          {book.name} by {book.author}
        </div> */}
        <div className="grid grid-cols-2 ">
          <div className="px-16 py-8 min-w-[250px]">
          </div>
          <div className="pt-12 grid grid-auto-rows">
            <ul className="text-bold text-xl">{book.price}</ul>
            <ReactStars
              count={5}
              value={book.stars}
              size={24}
              edit={false}
              color1={"#000"}
              color2={"#c2b542"}
            />

            <ul>Quantity Available: {book.qty}</ul>
            <ul className="flex">
              Add to Wishlist: &nbsp;
              <span className="py-1">
                <Heart
                  style={{ width: "20px" }}
                  isActive={active}
                  onClick={() => setActive(!active)}
                  activeColor={"#404252"}
                />
              </span>
            </ul>
            <u>
              <a href="/">Check availability in stores near you</a>
            </u>

            <div className="flex">
              <button
                className="px-1 pb-2 hover:bg-persian_plum hover:text-gainsboro text-3xl"
                onClick={() => subtract(quantity)}
              >
                <Icon>remove</Icon>
              </button>
              <p className="px-2 pt-3 text-lg ">{quantity}</p>
              <button
                className="px-1 pb-2 hover:bg-persian_plum hover:text-gainsboro text-3xl"
                onClick={() => add(quantity)}
              >
                +
              </button>
              <button className="pl-4" onClick={() => setQuantity(0)}>
                {" "}
                Clear{" "}
              </button>
            </div>

            <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
              <button class="text-slate-800 font-semibold hover:text-black focus:text-black bg-polished_pine rounded p-3 border-2">
                Add to cart
              </button>

              <button class="text-slate-800 font-semibold focus:text-black focus:bg-persian_plum rounded p-3 border-2">
                Instant Purchase
              </button>
            </div>
            <ul className="row-span-6" />
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default BooksPageGenerator;

/*
 
    {
    name: "How Easy is That?",
    author: "Ina Garten",
    image: require("./Books/howeasyisthat.png"),
    review:
      "HET A genius book about an incredible mind, yadda yadda blah blah blah lots of gushing and awing because I like books.",
    link: "/Ina Garten/How Easy is That",
    },
  
*/
