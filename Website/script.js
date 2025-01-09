function convert() {
  const inputNumber = document.getElementById("input-number").value.trim();
  const sourceBase = document.getElementById("source-base").value;
  const targetBase = document.getElementById("target-base").value;

  let result = "";

  try {
    if (sourceBase === "roman") {
      // Römische Zahl zu Dezimal
      const decimal = romanToDecimal(inputNumber);
      result = convertFromDecimal(decimal, targetBase);
    } else if (targetBase === "roman") {
      // Dezimal zu Römisch
      const decimal = parseInt(inputNumber, sourceBase);
      result = decimalToRoman(decimal);
    } else if (targetBase === "ascii") {
      // Dezimal zu ASCII
      const decimal = parseInt(inputNumber, sourceBase);
      result = String.fromCharCode(decimal);
    } else if (targetBase === "utf8") {
      // Text zu UTF-8
      result = utf8Encode(inputNumber);
    } else if (targetBase === "utf32") {
      // Text zu UTF-32
      result = utf32Encode(inputNumber);
    } else {
      // Allgemeine Konvertierung zwischen Zahlensystemen
      const decimal = parseInt(inputNumber, sourceBase);
      result = decimal.toString(targetBase);
    }
  } catch (error) {
    result = "Ungültige Eingabe";
  }

  document.getElementById("result").innerText = result;
}

function romanToDecimal(roman) {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let decimal = 0;
  let i = 0;

  while (i < roman.length) {
    const twoChar = roman.substr(i, 2);
    if (romanNumerals[twoChar]) {
      decimal += romanNumerals[twoChar];
      i += 2;
    } else {
      decimal += romanNumerals[roman[i]];
      i++;
    }
  }

  return decimal;
}

function decimalToRoman(num) {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let roman = "";

  for (const [letter, value] of romanNumerals) {
    while (num >= value) {
      roman += letter;
      num -= value;
    }
  }

  return roman;
}

function utf8Encode(text) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  return Array.from(encoded)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join(" ");
}

function utf32Encode(text) {
  const codePoints = Array.from(text).map((char) => char.codePointAt(0));
  return codePoints
    .map((cp) => cp.toString(16).padStart(8, "0"))
    .join(" ");
}
