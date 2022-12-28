import React from "react";

function Home() {
  return (
    <div className="home">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',background: '#00120B', height: '6vh', width: '20vw'}}>
          <h1 style={{ color: 'white'}}>Welcome</h1>
      </div>
      <h2 style={{ textAlign: 'center'}}>
        Welcome to the Book Store Website!
        If You Love Books, You'll Love Our Book Store!
      </h2>
      <div style={{background: '#B49A67', height: '8vh', width: '40vw'}}>
        <h2>November 27th, 2022 - Weekly Newsletter</h2>
        <p>
        New Books will be coming in the next week. We will also be having a signing day for a very special author. STAY TUNED FOR MORE INFO!!
        </p>
      </div>
      <div style={{background: '#B49A67', height: '8vh', width: '40vw'}}>
        <h2>November 21st, 2022 - The Biggest Sale Ever Now Through New Years Day </h2>
        <p>
        40%, 60%, and 80% off on best sellers. Come in store today and get an additional 20% on your total purchase.
        </p>
      </div>
    </div>
  );
}

export default Home;
