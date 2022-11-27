// Terms & Services Page
import React from "react";

const longText = "Our site uses an order form for customers to request information, products, and services. We request visitor's contact information (name, address, and email address) and financial information (payment information to make purchases). Contact information from the order form is used to ship orders to customers. The customer's contact information is used to contact the visitor when necessary. Financial information that is collected is used to bill the customer for products and services.";
const longText2 = "The website has security measures in place to protect the loss, misuse, and alteration of the information under our control. We use 128-bit SSL encryption to protect your financial information";
const longText3 = "We provide users the following information options for removing their information from our database and to not receive any further communications from our service.";
const longText4 = "If you have any questions about our terms and service, the practices of this site, or your dealings with our website, feel free to contact us at: ";
const shortText = "The Book Dispensary";
const shortText1 = "710-C Gracern Rd,";
const shortText2 = "Columbia, SC 29210";
const point1 = "1. You can send an email to info@mybookdispensary.com";
const point2 = "2. You can send a letter to the following postal address.";

function TermsServices() {
  return (
    <div className="termsservices">
      <h1 style={{ color: 'green' }}>Terms of Service</h1>
        <p>{longText}</p>
        <p>{longText2}</p>
        <p>{longText3}</p>
        <p>{point1}</p>
        <p>{point2}</p>
        <p>{longText4}</p>
        <p>{shortText}</p>
        <p>{shortText1}</p>
        <p>{shortText2}</p>
    </div>
  );
}

export default TermsServices;
