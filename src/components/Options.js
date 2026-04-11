import React, { useState } from "react";
import "./Options.css"
import { Link } from 'react-router-dom';

function Option() {
  const [answer, setAnswer] = useState("");
  const userName = localStorage.getItem('userName');
  const userSign = localStorage.getItem('userSign');

  const handleYesClick = () => {
    setAnswer("ZODIAC  INFO");
  };

  const handleNoClick = () => {
    setAnswer("ZODIAC MATCHING");
  };

  return (
    <div className="option">
      <h1>{userName ? `Welcome, ${userName}!` : "Select Your Choice"}</h1>
      <p style={{ color: 'white' }}>Select Your Choice</p>
      <br/>
      <br/>
      <Link to="/persona">
      <button onClick={handleYesClick}>ZODIAC  INFO</button></Link>
      <br/>
      <br/>
      
      <Link to="/match">
      <button onClick={handleNoClick}>ZODIAC MATCHING</button></Link>
      <br/>
      <br/>
      {answer && <p>Your Option is: {answer}</p>}
    </div>
  );
}

export default Option;
