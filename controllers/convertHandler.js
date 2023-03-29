function ConvertHandler() {
  // function for separed num and units

  const divideNumUnit = (input) => {
    let idxBreak = 0;
    for (let a = 0; a < input.length; a++) {
      if (/[^0-9\.\/]/gi.test(input[a])) {
        idxBreak = a;
        break;
      }
    }
    return idxBreak;
  };

  this.getNum = function (input) {
    let result;
    let validRegexPattern =
      /^(\d+\.?\d*|\.\d+|\d+\.?\d*\/\d+\.?\d*|\.\d+\/\.\d+|\d+\.?\d*\/\.\d+|\.\d+\/\d+\.?\d*)$/gi;

    let numFromInput = input.slice(0, divideNumUnit(input));

    if (numFromInput.length === 0) {
      result = 1;
    } else if (validRegexPattern.test(numFromInput)) {
      if (!numFromInput.includes("/")) {
        if (parseFloat(numFromInput) === 0) {
          result = false;
        } else {
          result = parseFloat(numFromInput);
        }
      } else {
        let numerator = numFromInput.slice(0, numFromInput.indexOf("/"));
        let denominator = numFromInput.slice(numFromInput.indexOf("/") + 1);

        result = parseFloat(numerator) / parseFloat(denominator);
      }
    } else {
      result = false;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    let validRegexPattern = /^(gal|l|mi|km|lbs|kg)$/gi;

    let unitFromInput = input.slice(divideNumUnit(input));

    if (validRegexPattern.test(unitFromInput)) {
      if (unitFromInput.toLowerCase() === "l") {
        result = "L";
      } else {
        result = unitFromInput.toLowerCase();
      }
    } else {
      result = false;
    }
    return result;
  };

  this.getReturnUnit = function (input) {
    let result;
    let fromInput = input.toLowerCase();

    let objRtnUnit = {
      l: "gal",
      gal: "L",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    result = objRtnUnit[fromInput];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === "L") {
      result = initNum / galToL;
    } else if (initUnit === "gal") {
      result = initNum * galToL;
    } else if (initUnit === "mi") {
      result = initNum * miToKm;
    } else if (initUnit === "km") {
      result = initNum / miToKm;
    } else if (initUnit === "lbs") {
      result = initNum * lbsToKg;
    } else if (initUnit === "kg") {
      result = initNum / lbsToKg;
    }

    return result.toFixed(5) * 1;
  };

  this.spellOutUnit = function (unit) {
    let result;

    let objSpellOutUnit = {
      L: "liters",
      gal: "gallons",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    result = objSpellOutUnit[unit];

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
