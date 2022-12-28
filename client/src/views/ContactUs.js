// Contact Us Page
// by William Hobbs
// with help from tutorial at https://www.youtube.com/watch?v=bMq2riFCF90

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import phoneicon from '../assets/phoneicon.jpg';
import emailicon from '../assets/emailicon.jpg';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ddw3f6r",
        "template_peypdcl",
        form.current,
        "MEck6kXn4BPEa6daF"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background: '#00120B', height: '6vh', width: '20vw'}}>
        <h1 style={{ color: 'white' }}>Contact Us</h1>
      </div>
      <div style={{ textAlign: 'center'}}>
        <h2>Want to get in touch? Call us at the number below or send an email to the Bookstore by filling out the form below. We would love to hear from you!</h2>
      </div>
      <div style={{background: '#B49A67', float: 'left', height: '40vh', width: '30vw'}}>
        <h2>Email</h2>
        <div style={{ textAlign: 'center'}}>
          <img src={emailicon} alt="Email" />
        </div>
        <p>Too lazy to dial the number, feel free to chat with us through email.</p>
        <form ref={form} onSubmit={sendEmail}>
          <div>
            <label>Name: </label>
            <input type="text" name="from_name" />
          </div>
          <div>
            <label>Email: </label>
            <input type="email" name="from_email" />
          </div>
          <p> </p>
          <div>
            <label>Message: </label>
            <textarea name="message" />
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>
      <div style={{background: '#B49A67', float: 'right', height: '40vh', width: '30vw'}}>
      <h2>Phone</h2>
      <div style={{ textAlign: 'center'}}>
        <img src={phoneicon} alt="Phone" />
      </div>
      <p>If you don't want to use email you can alternatively just pick up the phone and feel free to chat with us at this number: (803) 111-1111</p> 
      </div>
    </>
  );
};

export default ContactForm;
