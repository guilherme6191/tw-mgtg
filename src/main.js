var Units = {};

var Currency = {};

var RomanNumerals = ['i', 'v', 'x', 'l', 'c', 'd', 'm'];

var isAssignmentRegEx = new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i);
var isCreditRegEx = new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+credits$/i);
var HowMuchRegEx = new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i);
var HowManyRegEx = new RegExp(/^how\s+many\s+credits\s+is\s+([a-z\s]+)[?]$/i);

var isValidRomanRegEx = new RegExp(
  /^m{0,3}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/);

var RomanDecimalMap = {
  i: 1,
  v: 5,
  x: 10,
  l: 50,
  c: 100,
  d: 500,
  m: 1000
};

/**
 * Converts inter galaxy currency
 * @param CurrencyArr
 * @returns {number}
 * @constructor
 */
function convertCurrency(CurrencyArr) {
  var romanStr = '';
  var answer = 0;
  for (var i = 0; i < CurrencyArr.length; i++) {
    if (Currency[CurrencyArr[i].toLowerCase()]) {
      romanStr += Currency[CurrencyArr[i].toLowerCase()];
    } else {
      return -1;
    }
  }
  if (!isValidRomanRegEx.test(romanStr)) {
    return -1;
  }
  var decimalValues = [];
  romanStr.split('').forEach(function(e, i, arr) {
    decimalValues.push(RomanDecimalMap[e]);
    if (RomanDecimalMap[e] < RomanDecimalMap[arr[i + 1]]) {
      decimalValues[i] *= -1;
    }
  });
  answer = decimalValues.reduce(function(a, b) {
    return a + b;
  });
  return answer;
}

/**
 * Assigns a Roman value to intergalaxy currency
 * @param partials
 */
function setAssignment(partials) {
  if (!Currency[partials[0].toLowerCase()]) {
    var index = RomanNumerals.indexOf(partials[2].toLowerCase());
    if (index > -1) {
      RomanNumerals.splice(index, 1);
      return Currency[partials[0].toLowerCase()] = partials[2].toLowerCase();
    } else {
      return partials[2] + ' is already assigned';
    }
  } else if (Currency[partials[0].toLowerCase()] !== RomanDecimalMap[partials[2]
      .toLowerCase()]) {
    return partials[0] + ' already has a conversion unit';
  }
}

/**
 * Sets a value to a Unit (Gold, Silver, etc)
 * @param partials
 * @param CreditVal
 */
function setCredit(partials, CreditVal) {
  if (partials === '') {
    return 'Please enter any currency';
  }
  var parts = partials.split(/\s+/);
  var unit = parts.pop();
  if (Currency[unit.toLowerCase()]) {
    return unit + ' is currency, provide a Unit';
  }
  if (partials.length < 1) {
    return 'No Currency provided';
  }
  var value = convertCurrency(parts);
  if ((CreditVal / value) < 0.00001) {
    return 'Credit too low';
  }
  if (value !== -1) {
    value = CreditVal / value;
    return Units[unit.toLowerCase()] = value;
  } else {
    return 'Invalid Currency';
  }
}

/**
 * Answers 'how much' questions
 * @param partials
 */
function answerHowMuch(partials) {
  if (partials === '') {
    return 'Please enter any currency to convert';
  }
  partials = partials.split(/\s+/);
  var value = convertCurrency(partials);
  if (value !== -1) {
    return partials.join(' ') + ' is ' + value;
  } else {
    return 'Invalid Currency';
  }
}

/**
 * Answers 'how many' questions
 * @param partials
 */
function answerHowMany(partials) {
  var values = partials.split(/\s+/);
  if (values.length < 1) {
    return 'No Currency provided';
  }
  var unit = values.pop();
  if (!Units[unit.toLowerCase()]) {
    return 'No Unit provided';
  }
  var value = convertCurrency(values);
  if (value !== -1) {
    value *= Units[unit.toLowerCase()];
    return partials + ' is ' + value.toString()
      + ' Credits';
  } else {
    return 'Invalid Currency';
  }
}

/**
 * Main function to process each line of the input
 * @param line
 */
function processLine(line) {
  var regexResult;
  if (regexResult = isAssignmentRegEx.exec(line)) {
    setAssignment(regexResult[0].split(/\s+/));
  }
  else if (regexResult = isCreditRegEx.exec(line)) {
    setCredit(regexResult[1].trim(), parseFloat(regexResult[2]));
  }
  else if (regexResult = HowMuchRegEx.exec(line)) {
    return answerHowMuch(regexResult[1].trim());
  }
  else if (regexResult = HowManyRegEx.exec(line)) {
    return answerHowMany(regexResult[1].trim());
  } else {
    return 'I have no idea what you are talking about';
  }
}

module.exports = {
  answerHowMany: answerHowMany,
  answerHowMuch: answerHowMuch,
  convertCurrency: convertCurrency,
  processLine: processLine,
  setAssignment: setAssignment,
  setCredit: setCredit,
};
