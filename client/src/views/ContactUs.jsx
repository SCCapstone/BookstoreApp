//imports
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import swal from 'sweetalert2';

/*contact us form where users can email or call us for any questions or thoughts. Users can fill out a form for the 
email with the their name, email, or message or we have also added the phone number to the view as well.*/
//the contact us form which uses a react hook for rendering (useRef)
const ContactUs = () => {
  const form = useRef();

  //for the email component of contact us
  const sendEmail = (e) => {
    e.preventDefault();

    //sends the current form
    emailjs
      .sendForm(
        "service_ddw3f6r",
        "template_peypdcl",
        form.current,
        "MEck6kXn4BPEa6daF"
      )
      .then(
        //sends a good swal if the email form got send successfully 
        (result) => {
          swal.fire({
            icon: 'success',
            title: 'Message Sent Successfully'
          })
        },
        (error) => {
          //sends a bad swal if it fails or has an error
          swal.fire({
            icon: 'error',
            title: 'Try Again Later',
            text: error.text,
          })
        }
      );
  };

  //Contact Us form which has a message for the users on ways to contact: fill out the email form or call using the phone number.
  //The form that users will fill includes the name of the user, user email, and the message. 
  return (
    <div class="pb-4 h-full text-gray-800 max-w-[1500px]">
      <div class="py-4">
        <div class="grid text-center text-3xl py-3 ">
          Contact us
        </div>
      </div>
      <br />
      <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-1 h-full g-6">
        <div class="w-full gap-2 ">
            <div className={`${styles.paragraph} max-w-[1500px]`}>
              <h2>
                Want to get in touch? Call us at the number below or send an
                email to the Bookstore by filling out the form below. We
                would love to hear from you!
              </h2>
            </div>
            <div className="gap-2">
              <p className={`${styles.paragraph} max-w-[1500px]`}>
                Too lazy to dial the number, feel free to chat with us
                through email.
              </p>
              <form ref={form} onSubmit={sendEmail} className="max-w-[500px]">
                <div>
                  <label>Name: </label>
                  <input
                    type="text"
                    name="from_name"
                    className="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel focus:bg-white border border-solid border-black rounded"
                  />
                </div>
                <div>
                  <label>Email: </label>
                  <input
                    type="email"
                    name="from_email"
                    className="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel focus:bg-white border border-solid border-black rounded"
                  />
                </div>
                <div>
                  <label>Message: </label>
                  <textarea
                    name="message"
                    className="form-control placeholder-black block w-full px-4 py-6 text-xl font-normal text-black bg-camel focus:bg-white border border-solid border-black rounded"
                  />
                </div>
                <div className="py-2">
                  <input
                    type="submit"
                    value="Send"
                    class="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                  />
                </div>
              </form>
            </div>
            {/* The phone number is a hard-coded phone number */}
            <div className="phone-container">
              <h2 className={`${styles.heading3} max-w-[1500px]`}>
                Phone:
              </h2>
              <div className={`${styles.paragraph} max-w-[1500px]`}></div>
              <p className="text-lg">
                If you don't want to use email you can alternatively just
                pick up the phone and feel free to chat with us at this
                number: (803) 111-1111
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
