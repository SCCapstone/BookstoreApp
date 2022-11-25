// Terms & Services Page
import React from "react";

function TermsServices() {
  return (
    <div className="termsservices">
      <h1 style={{ color: 'green' }}>Terms and Services</h1>
      <p>
        Our site uses an order form for customers to request information, products, and services.
        We request visitor's contact information (name, address, and email address) and financial information
        (payment information to make purchases). Contact information from the order form is used to ship orders
        to customers. The customer's contact information is used to contact the visitor when necessary. 
        Financial information that is collected is used to bill the customer and services  
      </p> 
      <p>
        We provide users the following information options for removing their information from our database 
        and to not receive any further communications from our service.
        <div style={{ display: 'inline', float: 'left' }}>
        <h5 style={{ color: 'red' }}>List-Decimal</h5>
          <ol style={{ listStyleType: 'decimal' }}>
            <li>You can send an email to info@mybookdispensary.com.</li>
            <li>You can send a letter to the following postal address.</li>
          </ol>
        </div>
      </p>
      <p>
        If you have any questions about our terms and service, the practices of this site, or your dealings
        with our website, feel free to contact us at:
        The Book Dispensary 710-C Gracern Rd, Columbia, SC 29210
      </p> 
    </div>
  );
}

export default TermsServices;
