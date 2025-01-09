function convert() {
  const inputNumber = document.getElementById("input-number").value.trim();
  const sourceBase = document.getElementById("source-base").value;
  const targetBase = document.getElementById("target-base").value;

  let result = "";

  try {
    // Überprüfen auf ungültige Kombinationen
    if (
      (sourceBase === "ascii" && targetBase !== "utf8" && targetBase !== "utf32") ||
      (targetBase === "ascii" && sourceBase !== "10") ||
      (sourceBase === "roman" && (targetBase === "ascii" || targetBase === "utf8" || targetBase === "utf32")) ||
      (targetBase === "roman" && (sourceBase === "ascii" || sourceBase === "utf8" || sourceBase === "utf32"))
    ) {
      throw new Error("Ungültige Umrechnung zwischen den ausgewählten Zahlensystemen.");
    }

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
      if (isNaN(decimal) || decimal < 0 || decimal > 255) {
        throw new Error("ASCII-Werte müssen im Bereich von 0 bis 255 liegen.");
      }
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
    result = error.message;
  }

  document.getElementById("result").innerText = result;
}

function romanToDecimal(roman) {
  const romanNumerals = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };

  let decimal = 0;
  let prevValue = 0;

  for (let char of roman.toUpperCase()) {
    const value = romanNumerals[char];
    if (!value) throw new Error("Ungültige römische Zahl.");
    if (value > prevValue) {
      decimal += value - 2 * prevValue;
    } else {
      decimal += value;
    }
    prevValue = value;
  }

  return decimal;
}

function decimalToRoman(decimal) {
  if (decimal <= 0 || decimal > 3999) {
    throw new Error("Römische Zahlen können nur Werte zwischen 1 und 3999 darstellen.");
  }

  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";

  for (const { value, symbol } of romanNumerals) {
    while (decimal >= value) {
      result += symbol;
      decimal -= value;
    }
  }

  return result;
}

function utf8Encode(text) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  return Array.from(encoded).map((byte) => byte.toString(16).padStart(2, "0")).join(" ");
}

function utf32Encode(text) {
  return Array.from(text)
    .map((char) => char.codePointAt(0).toString(16).padStart(8, "0"))
    .join(" ");
}

function copyToClipboard() {
  const result = document.getElementById("result").innerText;
  if (result) {
    navigator.clipboard.writeText(result).then(
      () => alert("Ergebnis wurde in die Zwischenablage kopiert!"),
      () => alert("Kopieren fehlgeschlagen. Bitte versuchen Sie es erneut.")
    );
  } else {
    alert("Es gibt kein Ergebnis zum Kopieren.");
  }
}
