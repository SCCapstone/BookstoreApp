const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

const msg = {
  to: 'hobbs.man58@gmail.com', // Change to your recipient
  from: 'hobbsman58@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const contactUsMsg = (receiverEmail, text) => {
    const email = {
        to: 'hobbsman58@gmail.com',
        from: receiverEmail,
        subject: "New Contact us message from Bookstore",
        text: text,
        html: '<strong>hello there</strong>',
    }
    return email;
}

const sendEmail = async (email) => sgMail.send(email);

export default contactUsMsg, sendEmail;