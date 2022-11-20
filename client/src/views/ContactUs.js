// Contact Us Page
// by William Hobbs
// with help from tutorial at https://www.youtube.com/watch?v=bMq2riFCF90

import React, { useRef } from "react";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ddw3f6r', 'template_peypdcl', form.current, 'MEck6kXn4BPEa6daF')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return <>
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="from_name" />
            <label>Email</label>
            <input type="email" name="from_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />

        </form>
    </>
};

export default ContactForm;