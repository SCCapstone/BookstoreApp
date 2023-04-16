import React from "react";
import { styles } from "../styles";
import {alfred} from "../assets/alfred-headshot.png"
import {jack} from "../assets/jack-headshot.jpeg"
import {sai} from "../assets/alfred-headshot.jpeg"
import {hobbs} from "../assets/hobbs-headshot.jpeg"
import {rahul} from "../assets/rahul-headshot.jpeg"

const Aboutus = () => {
  return (
    <section>
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          About Us
        </div>
      </div>
      <div>
      <p>
          Now you might be wondering why we chose to create a website on a bookstore? 
          The vision of this came from our group member, Jack Oberman. Over the summer, he had worked 
          at a local bookstore called The Book Dispensary. He had brought the problem up of how bad their website
          is, with the color scheme, the attributes not working, and how it hasn't been maintained in a good bit.
          So, as a group we decided to essentially refurbish their website. Later into the second part of the 
          semester we had created our own logo for a bookstore, so we branched out and created our own custom, dummy 
          bookstore for users to experience. Our bookstore website, even though it has a been based on The Book Dispensary,
          has become so much more with many different unique features that users can experince.
          The platform could really revolutionize the making of websites for bookstores in the near future as well. 
        </p>
        <p>
          The Bugsy's Barn Books was created by a group of University of South Carolina students to fulfill the 
          requirements of CSCE 490 (Capstone Computing Project I) and CSCE 492 (Capstone Computing Project II). 
          The members of this project are Rahul Bulusu, William Hobbs, Alfred Lin, Jack Oberman, and Sai Oruganti. 
          {/* Add linkedin links of everyone as well as a headshot*/}
        </p>
        <div>
        <a href="" target="_blank" rel="noreferrer">
        <img src={cbLogo} alt="Coding Beauty logo"></img>
      </a>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
