import React from "react";
import { styles } from "../styles"; //import styles for the aesthetics

{/* The Terms of Service Page is a dead-end page that displays the privacy policy and how to contact us with any user questions. */}

// initializes long and short constant, fixed strings which make up the TOS
const longText =
  "This is a FAKE bookstore.";
const longText2 =
  "We do not sell real books even though we have examples of books, those are for demostrations only.";
const longText3 =
  "Do not use real payments such as the following below:";
const longText4 =
  "You will not recieve any warranty, we do not isssue any warranty, NO EXCEPTIONS.";
const longText5 =
  "THIS WEBSITE IS ONLY FOR EDUCATION PURPOSE ONLY";
const shortText = "The Bugsy's Barn Books";
const shortText1 = "123 UniversitySC Ave,";
const shortText2 = "Columbia, SC 29210";
const point1 = "Credit Cards / Debit Cards / etc...";
const point2 = "PayPal / AppplePay / GooglePay / etc...";

//const page which can only be modified through the code
const TOS = () => {
  // returns the long and short string texts to create the TOS page as displayed in paragraph style
  return (
    <section>
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Terms of Service
        </div>
      </div>
      <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-4/12 w-4/12 py-2 grid grid-auto-rows gap-4">
        <p className={`${styles.paragraph} max-w-[1158px]`}>{longText}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{longText2}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{longText3}</p>
        <li className={`${styles.paragraph} max-w-[1158px] ml-8`}>{point1}</li>
        <li className={`${styles.paragraph} max-w-[1158px] ml-8`}>{point2}</li>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{longText4}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{longText5}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{shortText}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{shortText1}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{shortText2}</p>
      </div>
    </section>
  );
};

export default TOS;
