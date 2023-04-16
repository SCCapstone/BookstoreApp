import React from "react";
import { styles } from "../styles";
import rahul_headshot from "../assets/rahul_headshot.jpg";
import hobbs_headshot from "../assets/hobbs_headshot.jpg";
import alfred_headshot from "../assets/alfred_headshot.png";
import jack_headshot from "../assets/jack_headshot.jpg";
import sai_headshot from "../assets/sai_headshot.jpg";

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
          To view a member's profile from the group click on their picture which will take you to either their LinkedIn profile 
          or their GitHub page. 
          {/* Add linkedin links of everyone as well as a headshot*/}
        </p>
        <div>
          <a href="https://www.linkedin.com/in/rahul-bulusu-4889771b1/" target="_blank" rel="noreferrer">
            <img 
              src={rahul_headshot} 
              alt="Rahul Bulusu"
              className="max-w-[200px]"
            />
          </a>
          <a href="https://github.com/wihobbs" target="_blank" rel="noreferrer">
            <img 
              src={hobbs_headshot} 
              alt="William Hobbs"
              className="max-w-[200px]"
            />
          </a>
          <a href="https://github.com/linalfred08" target="_blank" rel="noreferrer">
            <img 
              src={alfred_headshot} 
              alt="Alfred Lin"
              className="max-w-[200px]"
            />
          </a>
          <a href="https://www.linkedin.com/in/jack-c-oberman/" target="_blank" rel="noreferrer">
            <img 
              src={jack_headshot} 
              alt="Jack Oberman"
              className="max-w-[200px]"
            />
          </a>
          <a href="https://www.linkedin.com/in/sai-durga-rithvik-oruganti-4a5950245/" target="_blank" rel="noreferrer">
            <img 
              src={sai_headshot} 
              alt="Sai Oruganti"
              className="max-w-[200px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
