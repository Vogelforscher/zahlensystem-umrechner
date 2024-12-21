function convert() {
  const inputNumber = document.getElementById('input-number').value;
  const sourceBase = document.getElementById('source-base').value;
  const targetBase = document.getElementById('target-base').value;

  if (!inputNumber) {
    alert('Bitte eine Zahl eingeben!');
    return;
  }

  try {
    let decimalNumber;

    // Umwandlung in Dezimalzahl basierend auf dem Quell-Zahlensystem
    if (sourceBase === 'roman') {
      decimalNumber = romanToDecimal(inputNumber); // Römische Zahl in Dezimal
    } else {
      decimalNumber = parseInt(inputNumber, parseInt(sourceBase));
    }

    let convertedNumber;

    // Umwandlung vom Dezimalsystem in das Ziel-Zahlensystem
    if (targetBase === 'roman') {
      convertedNumber = decimalToRoman(decimalNumber); // Dezimal in Römisch
    } else {
      convertedNumber = decimalNumber.toString(parseInt(targetBase));
    }

    // Ergebnis anzeigen
    document.getElementById('result').textContent = convertedNumber.toUpperCase();
  } catch (error) {
    alert('Ungültige Eingabe oder Zahlensystem!');
  }
}

// Funktion: Dezimal -> Römische Zahl
function decimalToRoman(num) {
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
    { value: 1, numeral: 'I' }
  ];

  let result = '';

  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      num -= romanNumerals[i].value;
    }
  }

  return result;
}

// Funktion: Römische Zahl -> Dezimal
function romanToDecimal(roman) {
  const romanNumerals = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;
  let prevValue = 0;

  // Rückwärts durch die römische Zahl gehen
  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanNumerals[roman[i].toUpperCase()];

    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }

    prevValue = currentValue;
  }

  return result;
}
