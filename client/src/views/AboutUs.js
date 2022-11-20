// About Us Page
import React from "react";
import bookstorepic from './bookstorepic.jpg'; 

function AboutUs() {
  return (
    <div className="aboutus">
      <h1>About Us</h1>
      <p>
        The Book Dispensary is a local, family owned business that began life December 2, 1975
        in Columbia's St. Andrews area, near the intersection of Bush River Road and I-126 in 
        what was then Boardwalk Plaza Shopping Center. For nearly 40 years we have been providing
        the people of Columbia and central South Carolina as well as people from all over the rest 
        of the US and many other parts of the world with everything from paperbacks to world class 
        collectible books and maps. This website has been refurbished so that both employees and 
        customers can use this site. 
      </p> 
      <img src={bookstorepic} alt="Book Dispensary" />
      <p>Location to Visit Us: 710-C Gracern Rd, Columbia, SC 29210</p> 
    </div>
  );
}

export default AboutUs;