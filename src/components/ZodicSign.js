import "./Button.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ZodicSign = ({onSignSelected}) => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const [selectedSign, setSelectedSign] = useState("");

  const handleSignSelected = async (sign) => {
    setSelectedSign(sign);
    const url = `https://horoscope-astrology.p.rapidapi.com/sign?s=${sign}`;
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
        shortResult = result.split('.').slice(0, 3).join('.') + '.';
      }
      
      setData(shortResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const sign = (location.state && location.state.sign) || localStorage.getItem('userSign');
    if (sign) {
      handleSignSelected(sign);
    }
  }, [location.state]);

  return (
    <div className="page">
      <h2>{selectedSign ? `Zodiac Profile: ${selectedSign.toUpperCase()}` : "Select Your Zodiac Sign"}</h2>
      <br/><br/>
      <div className="grid">
      {[
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
      ].map((sign) => (
        <button key={sign} onClick={() => handleSignSelected(sign)}>
          {sign}
        </button>
      ))}</div>
      {data && (
        <div style={{ padding: "20px", marginTop: "20px", backgroundColor: "rgba(0,0,0,0.7)", color: "white", borderRadius: "10px", maxWidth: "800px", margin: "20px auto" }}>
            <p>{data}</p>
        </div>
      )}
    </div>
  );
};

export default ZodicSign;
