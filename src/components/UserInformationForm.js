import React, { useState } from "react";
import "./UserInformationForm.css";
import { getZodiacSign } from "../utils/zodiacUtils";

function UserInformationForm() {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [sign, setSign] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSignInfo = async (zodiacSign) => {
    setLoading(true);
    const url = `https://horoscope-astrology.p.rapidapi.com/sign?s=${zodiacSign}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fcbaf83650mshece281c10b24667p17699bjsn63021bd3ac43",
        "X-RapidAPI-Host": "horoscope-astrology.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      
      let shortResult = result;
      try {
        const parsed = JSON.parse(result);
        if (parsed.nature) {
            shortResult = parsed.nature;
        } else if (parsed.about) {
            shortResult = parsed.about.split('.').slice(0, 3).join('.') + '.';
        }
      } catch (e) {
        // Fallback for plain text or unexpected format
        shortResult = result.length > 300 ? result.substring(0, 300) + "..." : result;
      }
      
      setData(shortResult);
    } catch (error) {
      console.error(error);
      setData("Failed to fetch zodiac details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (dateOfBirth && fullName) {
      const birthDate = new Date(dateOfBirth);
      const day = birthDate.getDate();
      const month = birthDate.getMonth() + 1;
      const calculatedSign = getZodiacSign(day, month);
      
      setSign(calculatedSign);
      localStorage.setItem('userSign', calculatedSign);
      localStorage.setItem('userName', fullName);
      
      fetchSignInfo(calculatedSign);
    } else {
      alert("Please enter at least your full name and date of birth.");
    }
  };
  
  return (
    <div className="Persona" style={{ height: 'auto', minHeight: '100vh', padding: '50px 0' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Enter Your Details</h2>
        
        <label className="lable" htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />

        <label className="lable" htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(event) => setDateOfBirth(event.target.value)}
          required
        />

        <label className="lable" htmlFor="timeOfBirth">Time of Birth:</label>
        <input
          type="time"
          id="timeOfBirth"
          value={timeOfBirth}
          onChange={(event) => setTimeOfBirth(event.target.value)}
        />

        <label className="lable" htmlFor="birthPlace">Birth Place:</label>
        <input
          type="text"
          id="birthPlace"
          placeholder="Enter your city of birth"
          value={birthPlace}
          onChange={(event) => setBirthPlace(event.target.value)}
        />

        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Get Zodiac Details</button>
      </form>

      {loading && <p style={{ textAlign: 'center', color: 'white' }}>Loading your destiny...</p>}
      
      {sign && fullName && !loading && (
        <div style={{ textAlign: 'center', color: 'white', marginTop: '30px' }}>
          <h3>{fullName}'s Zodiac Sign: <span style={{ color: '#1cd6eb', textTransform: 'uppercase' }}>{sign}</span></h3>
          {data && (
            <div style={{ 
              padding: "20px", 
              marginTop: "20px", 
              backgroundColor: "rgba(0,0,0,0.85)", 
              color: "white", 
              borderRadius: "15px", 
              maxWidth: "600px", 
              margin: "20px auto",
              border: "2px solid #1cd6eb",
              boxShadow: "0 0 15px rgba(28, 214, 235, 0.3)"
            }}>
              <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{data}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserInformationForm;