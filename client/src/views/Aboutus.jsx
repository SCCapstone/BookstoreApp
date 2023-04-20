import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import rahul_headshot from "../assets/rahul_headshot.jpg";
import hobbs_headshot from "../assets/hobbs_headshot.jpg";
import alfred_headshot from "../assets/alfred_headshot.png";
import jack_headshot from "../assets/jack_headshot.jpg";
import sai_headshot from "../assets/sai_headshot.jpg";
import browse from "../assets/browse.jpg";
import validatedUsers from "../assets/validatedUsers.jpg";
import contactUs from "../assets/contactUs.jpg";
import orders from "../assets/orders.jpg";
import exampleBook from "../assets/exampleBook.jpg";
import editBlog from "../assets/editBlog.jpg";
import employeePage from "../assets/employeePage.jpg";

const Aboutus = () => {
  return (
    <section>
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          About Us
        </div>
      </div>
      <div>
      {/* Demo Video */}
      <h1 className="text-2xl font-medium mb-4 text-center">
          A Demonstration Video
      </h1>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/mCepHNEqVIg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      {/* Selling Advertisement statement for why users should use our bookstore*/}
      <h1 className="text-2xl font-medium mb-4 text-center">
          Marketing Statement for Bugsy's Barn Books
      </h1>
      <p>
        Our bookstore web application provides an effortless and seamless browsing experience, 
        allowing users to easily discover and purchase a wide range of books from various genres, authors, 
        and sort by various other options all in one convenient place.
        With our user-friendly interface, our bookstore web application also provides convenient features such as book reviews and adding a book to a wishlist, empowering users with 
        valuable insights and information to make informed purchasing decisions, fostering a sense of trust and credibility in our platform. 
        For admin/employees, our application gives a seamless experience for them to add blogs and special deals, add and update books, fulfill orders on time, 
        and a place for employees to see important meetings/events. 
        Lastly, our bookstore web application prioritizes user security and privacy with requiring users to have some form of a complex password and hashing these passwords. 
      </p>
      {/* The vision of the bookstore */}
      <h1 className="text-2xl font-medium mb-4 text-center">
            Vision of Bugsy's Barn Books
      </h1>
      <p> 
          The vision of this website came from our group member, Jack Oberman. Over the summer, he had worked 
          at a local bookstore called The Book Dispensary. He had brought the problem up of how low quality their website
          is, with the color scheme, the attributes not working, and how it hasn't been maintained in a good bit.
          So, as a group we decided to essentially refurbish their website. Later into the second part of the 
          semester we had created our own logo for a bookstore, so we branched out and created our own custom, dummy 
          bookstore for users to experience. Our bookstore website, even though it has a been based on The Book Dispensary,
          has become so much more with many different unique features that users can experience.
          The platform could really revolutionize the making of websites for bookstores in the near future as well. 
        </p>
      <h2 className="text-2xl font-medium mb-4 text-center">
        Our GitHub Repository (Private)
      </h2>
      <a href="https://github.com/SCCapstone/BufferOverload" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 'bold' }}>Our GitHub Repository is linked here.</span>
            </a>
        {/* Screenshots of the App and short discription of how the app works and how to navigate */}
        <div>
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Application Features
        </div>
          <h1 className="text-2xl font-medium mb-4 text-center">
            How does Bugsy's Barn Books work?
          </h1>
          <p>
            In order for user's to use our site, first, they need to login to their registered account. If user's 
            don't have an account, then they will need to register. Depending on the role of the user, they will have
            more options on the side bar. 
            If users are customers, then they can buy books and add reviews under the browse page.
            They can navigate to shopping cart icon to purchase.  
            If users are employees/admin, they can have the same features as customers plus they have the ability
            to add and update books, add blogs and latest deals, and access the employee home page. 
            If users have questions then they can contact us.
          </p>
          <div>
            <img
              src={browse} 
              alt="Browse"
              className="max-w-[5999px]"
            />
            <img
              src={exampleBook} 
              alt="Example Book"
              className="max-w-[5999px]"
            />
            <p>
              The Browse Page is where users can view all the books that are available in our bookstore inventory for potential purchase. 
              Users can find a book in multiple ways by simply browsing around, searching using the book title, or by the 
              “Sort by” dropdown menu feature which has the following options: “Best Selling,” “New Arrivals,” “Price: low to high,” or “Price: high to low.” 
            </p>
          </div>
          <img 
            src={orders} 
            alt="Orders"
            className="max-w-[5999px]"
          />
          <p>
            The Orders page is restricted to employees/admin. This page is where employees/admin can see the customer’s orders and fulfill them. 
            Specifically, it shows the order time which is formatted as the date followed by the exact time appended, the user's name which is their username, email address, exact order with the number of each type of book, total price, and status which is either shown as “In-Progress” or “Fulfilled.” 
            Once the order has been fulfilled the employees/admin can delete the order to show that it is finished. Additionally, if the customer no longer wants that order fulfilled, they can contact the bookstore to delete the order as well.
          </p>
          <img 
            src={validatedUsers} 
            alt="Validated Users"
            className="max-w-[5999px]"
          />
          <p>
            The Validated Users page is restricted to employees/admin, and it shows all the users who have accounts in the database. 
            Employees/admin have the ability to promote a customer to admin if they are employees of course. 
            Additionally, this is where admin can update/hardcode the balance for purchasing books. 
            The validated users page is broken into 5 categories: name of the user, email of the user, action (means the user can be deleted from our database upon request), the role (either customer or admin - resembles either employee or admin), and the balance for purchasing books.   
          </p>
          <img 
            src={contactUs} 
            alt="Contact Us"
            className="max-w-[5999px]"
          />
          <p>
            The Contact Us page is for if users have questions about anything relating to the bookstore website or purchasing books.
            Users can get in touch by email by filling out a small form which consists of the user's name, email, and the message.
          </p>
          <img 
            src={employeePage} 
            alt="Employee Home Page"
            className="max-w-[5999px]"
          />
          <p>
            The Employee Page is restricted to employees/admin and is to be used as an employee/admin home page. 
            This is where employees can view and create meetings for important messages and updates pertaining to the bookstore. 
            A calendar is available showing meetings and events taking place during that month.
            Employees have the ability to delete any event/meeting as well from the calendar. 
            Adding an event to the calendar is very simple: employees need to add the title of the event, and the starting and ending times. 
            They also have the ability to access the validated users page by clicking on “Click here to see user.” 
            They also can get redirected to the “Edit Blog Page” by clicking “Click here to edit blog post.” 
            Finally, they can get redirected to the orders page where they can view and fulfill/delete book orders by clicking on “Click here to order books.”  
          </p>
          <img 
            src={editBlog} 
            alt="Edit Blog"
            className="max-w-[5999px]"
          />
          <p>
            The Edit Blog page is restricted to employees/admin. 
            This can serve for both blogs as well as new information and latest deals. 
            Once an employee/admin creates and posts a blog, it appears on this page as well as the “Home” page where all users can view as well. 
            It is a very simple process: employees need to enter the title of the blog in the first box and enter a brief description in the next box. Then they click post. 
            They also have the ability to delete a blog as well. 
          </p>
        </div>

        {/* short description about the group members */}
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Group Members
        </div>
        <p>
          The Bugsy's Barn Books was created by a group of University of South Carolina Computer Science and Computer Engineering
          students to fulfill the requirements of CSCE 490 (Capstone Computing Project I) and CSCE 492 
          (Capstone Computing Project II). The members of this project are Rahul Bulusu, William Hobbs, Alfred Lin, Jack Oberman, and Sai Oruganti. 
        </p>
        {/* Add linkedin and github links of everyone as well as a headshot*/}
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
              <span className="height: 60px vertical-align: bottom" style={{ fontWeight: 'bold' }}><GitHubIcon/>GitHub</span>
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
              <span className="height: 60px vertical-align: bottom" style={{ fontWeight: 'bold' }}><GitHubIcon/>GitHub</span>
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
              <span className="height: 60px vertical-align: bottom" style={{ fontWeight: 'bold' }}><GitHubIcon/>GitHub</span>
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
              <span className="height: 60px vertical-align: bottom" style={{ fontWeight: 'bold' }}><GitHubIcon/>GitHub</span>
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
              <span className="height: 60px vertical-align: bottom" style={{ fontWeight: 'bold' }}><GitHubIcon/>GitHub</span>
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
