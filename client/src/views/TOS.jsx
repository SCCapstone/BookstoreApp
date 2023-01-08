import React from "react";
import { styles } from "../styles";

const longText =
  "Our site uses an order form for customers to request information, products, and services. We request visitor's contact information (name, address, and email address) and financial information (payment information to make purchases). Contact information from the order form is used to ship orders to customers. The customer's contact information is used to contact the visitor when necessary. Financial information that is collected is used to bill the customer for products and services.";
const longText2 =
  "The website has security measures in place to protect the loss, misuse, and alteration of the information under our control. We use 128-bit SSL encryption to protect your financial information";
const longText3 =
  "We provide users the following information options for removing their information from our database and to not receive any further communications from our service.";
const longText4 =
  "If you have any questions about our terms and service, the practices of this site, or your dealings with our website, feel free to contact us at: ";
const shortText = "The Book Dispensary";
const shortText1 = "710-C Gracern Rd,";
const shortText2 = "Columbia, SC 29210";
const point1 = "You can send an email to info@mybookdispensary.com";
const point2 = "You can send a letter to the following postal address.";

const TOS = () => {
  return (
    <section>
      <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid grid-auto-rows gap-4">
        <div className="text-white text-center bg-polished_pine text-3xl py-3 w-4/12 rounded place-self-center border-2 border-black">
          Terms of Service
        </div>
        <p className={`${styles.paragraph} max-w-[1400px]`}>{longText}</p>
        <p className={`${styles.paragraph} max-w-[1400px]`}>{longText2}</p>
        <p className={`${styles.paragraph} max-w-[1400px]`}>{longText3}</p>
        <li className={`${styles.paragraph} max-w-[1400px] ml-8`}>{point1}</li>
        <li className={`${styles.paragraph} max-w-[1400px] ml-8`}>{point2}</li>
        <p className={`${styles.paragraph} max-w-[1400px]`}>{longText4}</p>
        <p className={`${styles.paragraph} max-w-[1400px]`}>{shortText}</p>
        <p className={`${styles.paragraph} max-w-[1400px]`}>{shortText1}</p>
        <p className={`${styles.paragraph} max-w-[1400px]`}>{shortText2}</p>
      </div>
    </section>
  );
};

export default TOS;
