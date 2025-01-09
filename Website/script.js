function convert() {
  let input = document.getElementById("input-number").value.trim();
  let sourceBase = document.getElementById("source-base").value;
  let targetBase = document.getElementById("target-base").value;
  let result = document.getElementById("result");
  let errorMessage = document.getElementById("error-message");

  errorMessage.style.display = "none"; // Hide the error message initially

  if (input === "") {
    result.textContent = "Please enter a number.";
    return;
  }

  let convertedResult;
  
  try {
    if (sourceBase === "roman") {
      input = romanToDecimal(input);
    } else if (sourceBase === "ascii") {
      input = asciiToDecimal(input);
    } else if (sourceBase === "utf8") {
      input = utf8ToDecimal(input);
    } else if (sourceBase === "utf32") {
      input = utf32ToDecimal(input);
    } else {
      input = parseInt(input, parseInt(sourceBase));
    }

    if (isNaN(input)) {
      throw new Error("Invalid input");
    }

    switch (targetBase) {
      case "10":
        convertedResult = input;
        break;
      case "2":
        convertedResult = input.toString(2);
        break;
      case "16":
        convertedResult = input.toString(16).toUpperCase();
        break;
      case "8":
        convertedResult = input.toString(8);
        break;
      case "roman":
        convertedResult = decimalToRoman(input);
        break;
      case "ascii":
        convertedResult = decimalToAscii(input);
        break;
      case "utf8":
        convertedResult = decimalToUtf8(input);
        break;
      case "utf32":
        convertedResult = decimalToUtf32(input);
        break;
      default:
        throw new Error("Unsupported conversion");
    }
    result.textContent = convertedResult;
  } catch (error) {
    result.textContent = "";
    errorMessage.style.display = "block";
  }
}

function copyToClipboard() {
  let result = document.getElementById("result").textContent;
  navigator.clipboard.writeText(result)
    .then(() => {
      alert("Result copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy result.");
    });
}

function romanToDecimal(roman) {
  const romanNumerals = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let decimal = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanNumerals[roman[i]];
    const next = romanNumerals[roman[i + 1]];
    if (current < next) {
      decimal -= current;
    } else {
      decimal += current;
    }
  }
  return decimal;
}

function asciiToDecimal(ascii) {
  return ascii.split('').map(c => c.charCodeAt(0)).join('');
}

function utf8ToDecimal(utf8) {
  return utf8.split('').map(c => c.charCodeAt(0)).join('');
}

function utf32ToDecimal(utf32) {
  return utf32.split('').map(c => c.codePointAt(0)).join('');
}

function decimalToRoman(decimal) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];

  let result = '';
  for (let i = 0; i < romanNumerals.length; i++) {
    while (decimal >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      decimal -= romanNumerals[i].value;
    }
  }
  return result;
}

function decimalToAscii(decimal) {
  return String.fromCharCode(decimal);
}

function decimalToUtf8(decimal) {
  return String.fromCharCode(decimal);
}

function decimalToUtf32(decimal) {
  return String.fromCodePoint(decimal);
}
