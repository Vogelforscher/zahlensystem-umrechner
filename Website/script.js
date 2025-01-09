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

// Weitere Funktionen bleiben gleich (romanToDecimal, decimalToRoman, utf8Encode, utf32Encode).
