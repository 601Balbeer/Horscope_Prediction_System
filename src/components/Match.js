import React, { useState } from "react";
import "./Match.css";
import { calculateCompatibility } from "../utils/zodiacUtils";

function Match() {
  const userSign = localStorage.getItem('userSign') || "aries";
  const [sign1, setSign1] = useState(userSign);
  const [sign2, setSign2] = useState("aries");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMatch = async () => {
    setLoading(true);
    
    // Using traditional calculation for distinct points out of 36
    const scoreOutOf36 = calculateCompatibility(sign1, sign2);
    
    setTimeout(() => {
        let category = "";
        if (scoreOutOf36 < 15) {
            category = "Poor compatibility";
        } else if (scoreOutOf36 <= 25) {
            category = "Average compatibility";
        } else {
            category = "High compatibility";
        }

        setResult(`Score: ${scoreOutOf36}/36 - ${category}`);
        setLoading(false);
    }, 800); // Small delay for "loading" effect
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMatch();
  };

  return (
    <div className="match-container">
      <div className="match-card" style={{ maxWidth: '500px', width: '90%' }}>
        <h1>Match Maker</h1>
        <p style={{ marginBottom: '20px' }}>Select Compatibility Signs</p>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={{ width: '100%', marginBottom: '15px' }}>
                <label className="la" htmlFor="sign1">Your Sign</label>
                <select id="sign1" value={sign1} onChange={(e) => setSign1(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                <option value="aries">Aries</option>
                <option value="taurus">Taurus</option>
                <option value="gemini">Gemini</option>
                <option value="cancer">Cancer</option>
                <option value="leo">Leo</option>
                <option value="virgo">Virgo</option>
                <option value="libra">Libra</option>
                <option value="scorpio">Scorpio</option>
                <option value="sagittarius">Sagittarius</option>
                <option value="capricorn">Capricorn</option>
                <option value="aquarius">Aquarius</option>
                <option value="pisces">Pisces</option>
                </select>
            </div>

            <div style={{ width: '100%', marginBottom: '20px' }}>
                <label className="la"  htmlFor="sign2">Partner's Sign</label>
                <select id="sign2" value={sign2} onChange={(e) => setSign2(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                <option value="aries">Aries</option>
                <option value="taurus">Taurus</option>
                <option value="gemini">Gemini</option>
                <option value="cancer">Cancer</option>
                <option value="leo">Leo</option>
                <option value="virgo">Virgo</option>
                <option value="libra">Libra</option>
                <option value="scorpio">Scorpio</option>
                <option value="sagittarius">Sagittarius</option>
                <option value="capricorn">Capricorn</option>
                <option value="aquarius">Aquarius</option>
                <option value="pisces">Pisces</option>
                </select>
            </div>

            <button type="submit" style={{ width: '100%', marginBottom: '20px' }}>Check Compatibility</button>
        </form>

        {loading && <p>Checking compatibility...</p>}
        {result && !loading && (
            <div style={{ 
                padding: "15px", 
                backgroundColor: "rgba(28, 214, 235, 0.1)", 
                borderRadius: "8px", 
                border: "1px solid #1cd6eb",
                textAlign: 'center'
            }}>
                <p style={{ margin: 0, color: '#fff' }}>{result}</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default Match;