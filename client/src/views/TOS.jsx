import React from "react";
import { styles } from "../styles";

const longText =
  "";
const longText2 =
  "The website has security measures in place to protect the loss, misuse, and alteration of the information under our control. We use 128-bit SSL encryption to protect your financial information";
const longText3 =
  "We provide users the following information options for removing their information from our database and to not receive any further communications from our service.";
const longText4 =
  "If you have any questions about our terms and service, the practices of this site, or your dealings with our website, feel free to contact us at: ";
const shortText = "The Bugsy's Barn Books";
const shortText1 = "123 UniversitySC Ave,";
const shortText2 = "Columbia, SC 29210";
const point1 = "";
const point2 = "";

const TOS = () => {
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
        <p className={`${styles.paragraph} max-w-[1158px]`}>{shortText}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{shortText1}</p>
        <p className={`${styles.paragraph} max-w-[1158px]`}>{shortText2}</p>
      </div>
    </section>
  );
};

export default TOS;
