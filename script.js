<script>
  function convert() {
    const input = document.getElementById("inputValue").value;
    const conversionType = document.getElementById("conversionType").value;
    let result = "";

    // Dezimal zu Binär
    if (conversionType === "binary") {
      result = parseInt(input, 10).toString(2);
    }
    // Dezimal zu Hexadezimal
    else if (conversionType === "hexadecimal") {
      result = parseInt(input, 10).toString(16).toUpperCase();
    }
    // Dezimal zu Oktal
    else if (conversionType === "octal") {
      result = parseInt(input, 10).toString(8);
    }
    // Dezimal zu Römisch
    else if (conversionType === "roman") {
      result = toRoman(parseInt(input, 10));
    }
    // Dezimal zu ASCII
    else if (conversionType === "ascii") {
      result = String.fromCharCode(parseInt(input, 10));
    }
    // Text zu UTF-8
    else if (conversionType === "utf8") {
      result = utf8Encode(input);
    }
    // Text zu UTF-32
    else if (conversionType === "utf32") {
      result = utf32Encode(input);
    }

    document.getElementById("result").innerText = result;
  }

  function toRoman(num) {
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
</script>
