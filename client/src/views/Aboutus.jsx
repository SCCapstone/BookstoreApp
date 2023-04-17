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
        The current market for book selling demands that book sellers enter the online marketplace. 
        Heavy competition from big-box retail booksellers already hinders the reach of independent stores, 
        but with the customer base shifting towards online shopping, independent sellers are faced with the option of providing customers with some online portal or simply go out of business. 
        This is uniquely prevalent to our base in Columbia, South Carolina, which has several long-standing, independent bookstores. 
        This is to the extent that it is common for customers to take “Book Tours” throughout Columbia, going to multiple different independent bookstores in one day. 
        The demand for these bookstores is that they provide better service and atmosphere, as well as reuse books and typically sell books for cheaper. 
        They also offer a wider range of books, as they take in and resell most of the books which filter through their doors. 
        A limitation for this is that, if an individual customer was looking for a specific book, they can either:  
        <p>
          a. Order the book on an online marketplace such as Amazon, or 
        </p>
        <p>
          b. Call ahead of time and ask the book sellers if they have a certain book, or 
        </p>
        <p>
          c. Go to the store and pore through their collection, without a guarantee of finding their desired work. 
        </p>
        For many customers, the first option is the selected choice simply out of convenience. It is generally guaranteed to be successful and reduces effort. 
        While the second option does not require an intense effort, it shifts the effort on the book seller. Finally, the last option does not guarantee success and requires significant effort. 
        A website that enables independent bookstores to upload, maintain, and sell their books would solve both the second and third issues, offering them a lifeline against the big-box retail booksellers.   
      </p>
      <p> 
          The vision of this website came from our group member, Jack Oberman. Over the summer, he had worked 
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
          All work done for this website was split fairly among the group members.  
          {/* Add linkedin links of everyone as well as a headshot*/}
        </p>
        <div class="flex pb-2 text-center">
          <div>
            <a href="https://www.linkedin.com/in/rahul-bulusu-4889771b1/" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>Rahul Bulusu</span>
            </a>
            <a href="https://www.linkedin.com/in/rahul-bulusu-4889771b1/" target="_blank" rel="noreferrer">
              <img 
                src={rahul_headshot} 
                alt="Rahul Bulusu"
                className="max-w-[160px]"
              />
            </a>
            <a href="https://github.com/rahulbulusu" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>GitHub</span>
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/wihobbs/" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>William Hobbs</span>
            </a>
            <a href="https://www.linkedin.com/in/wihobbs/" target="_blank" rel="noreferrer">
              <img 
                src={hobbs_headshot} 
                alt="William Hobbs"
                className="max-w-[200px]"
              />
            </a>
            <a href="https://github.com/wihobbs" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>GitHub</span>
            </a>
          </div>
          <div>
            <a href="https://github.com/linalfred08" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>Alfred Lin</span>
            </a>
            <a href="https://github.com/linalfred08" target="_blank" rel="noreferrer">
              <img 
                src={alfred_headshot} 
                alt="Alfred Lin"
                className="max-w-[227.5px]"
              />
            </a>
            <a href="https://github.com/linalfred08" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>GitHub</span>
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/jack-c-oberman/" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>Jack Oberman</span>
            </a>
            <a href="https://www.linkedin.com/in/jack-c-oberman/" target="_blank" rel="noreferrer">
              <img 
                src={jack_headshot} 
                alt="Jack Oberman"
                className="max-w-[200px]"
              />
            </a>
            <a href="https://github.com/jackcoberman" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>GitHub</span>
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/sai-durga-rithvik-oruganti-4a5950245/" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>Sai Oruganti</span>
            </a>
            <a href="https://www.linkedin.com/in/sai-durga-rithvik-oruganti-4a5950245/" target="_blank" rel="noreferrer">
              <img 
                src={sai_headshot} 
                alt="Sai Oruganti"
                className="max-w-[200px]"
              />
            </a>
            <a href="https://github.com/s-orug" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>GitHub</span>
            </a>
          </div>
        </div>
        <p>
        *To view a member's profile from the group click on their name or picture which will take you to their LinkedIn profile if they have one
        or click on the GitHub link below the member's headshot to redirect to their GitHub page.*
        </p>
      </div>
    </section>
  );
};

export default Aboutus;
