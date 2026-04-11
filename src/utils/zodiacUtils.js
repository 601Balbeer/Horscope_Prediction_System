/**
 * Utility to calculate the zodiac sign based on day and month.
 * @param {number} day - Day of the month.
 * @param {number} month - Month of the year (1-12).
 * @returns {string} - The zodiac sign in lowercase.
 */
export const getZodiacSign = (day, month) => {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
  return "unknown";
};

export const calculateCompatibility = (sign1, sign2) => {
  const signs = [
    "aries", "taurus", "gemini", "cancer", 
    "leo", "virgo", "libra", "scorpio", 
    "sagittarius", "capricorn", "aquarius", "pisces"
  ];

  const s1 = sign1.toLowerCase();
  const s2 = sign2.toLowerCase();
  const i1 = signs.indexOf(s1);
  const i2 = signs.indexOf(s2);

  if (i1 === -1 || i2 === -1) return 18;

  // Calculate the distance between signs (1 to 12)
  const diff = Math.abs(i1 - i2);
  const distance = Math.min(diff, 12 - diff) + 1;

  // Astrological Aspect Logic
  switch (distance) {
    case 1: // Same Sign (1st House)
      return 34;
    case 5: // Trine (Same Element - 5th/9th House)
      return 31;
    case 3: // Sextile (Friendly - 3rd/11th House)
      return 27;
    case 7: // Opposition (7th House)
      return 23;
    case 2: // Neighboring (2nd/12th House)
      return 16;
    case 4: // Square (Challenging - 4th/10th House)
      return 12;
    case 6: // Quincunx (Difficult - 6th/8th House)
      return 9;
    default:
      return 18;
  }
};
