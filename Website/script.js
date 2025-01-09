function convert() {
  const inputNumber = document.getElementById("input-number").value.trim();
  const sourceBase = document.getElementById("source-base").value;
  const targetBase = document.getElementById("target-base").value;

  let result = "";

  try {
    if (sourceBase === "roman") {
      const decimal = romanToDecimal(inputNumber);
      result = convertFromDecimal(decimal, targetBase);
    } else if (targetBase === "roman") {
      const decimal = parseInt(inputNumber, sourceBase);
      result = decimalToRoman(decimal);
    } else if (targetBase === "ascii") {
      const decimal = parseInt(inputNumber, sourceBase);
      result = String.fromCharCode(decimal);
    } else if (targetBase === "utf8") {
      result = utf8Encode(inputNumber);
    } else if (targetBase === "utf32") {
      result = utf32Encode(inputNumber);
    } else {
      const decimal = parseInt(inputNumber, sourceBase);
      result = decimal.toString(targetBase);
    }
  } catch (error) {
    result = "Ungültige Eingabe";
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

// Weitere Funktionen wie romanToDecimal, decimalToRoman, utf8Encode und utf32Encode bleiben unverändert.
