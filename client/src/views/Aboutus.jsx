import React from "react";
import { styles } from "../styles";

const Aboutus = () => {
  return (
    <section>
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          About Us
        </div>
      </div>
      <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid grid-rows-auto max-w-[1400px]">
        <p className={`${styles.paragraph} max-w-[1158px]`}>
          The Bugsy's Barn Books was created by a group of University of South Carolina students to fulfill the 
          requirements of CSCE 490 (Capstone Computing Project I) and CSCE 492 (Capstone Computing Project II). 
          The members of this project are Rahul Bulusu, William Hobbs, Alfred Lin, Jack Oberman, and Sai Oruganti. 
          {/* Add linkedin links of everyone as well as a headshot*/}
        </p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>
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
      </div>
    </section>
  );
};

export default Aboutus;
