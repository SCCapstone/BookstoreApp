import React from "react";
import "../View.css";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="page-title-container">
        <h1 className="page-title-text">Welcome</h1>
      </div>
      <h2 className="txt-centered-container">
        Welcome to the Book Store Website! If You Love Books, You'll Love Our
        Book Store!
      </h2>
      <div className="news-container">
        <h2>November 27th, 2022 - Weekly Newsletter</h2>
        <p>
          New Books will be coming in the next week. We will also be having a
          signing day for a very special author. STAY TUNED FOR MORE INFO!!
        </p>
      </div>
      <div className="news-container">
        <h2>
          November 21st, 2022 - The Biggest Sale Ever Now Through New Years Day{" "}
        </h2>
        <p>
          40%, 60%, and 80% off on best sellers. Come in store today and get an
          additional 20% on your total purchase.
        </p>
      </div>
    </div>
  );
}

export default Home;
