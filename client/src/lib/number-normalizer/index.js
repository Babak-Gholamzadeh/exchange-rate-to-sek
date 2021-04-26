export const number2price = (value, {fixed = 5} = {}) => {
  const wholeNumber = parseInt(value);
  const fractional = fixed ?
        '.' + parseInt((parseFloat(value) % 1) * (10 ** fixed)).toString() :
  			'';
	const wholeNumberStr = wholeNumber.toString();
  const numberWithComma = [...wholeNumberStr].reduceRight((acc, digit, index) => {
    const reverseIndex = wholeNumberStr.length - index - 1;
    if(reverseIndex && !(reverseIndex % 3))
      acc.push(',');
		acc.push(digit);
    return acc;
  }, []).reverse().join('');
  return `${numberWithComma}${fractional}`;
};

export const normalizePositiveNumber = (value, { priceFormat = true, fixed = 2 } = {}) => {
  const strValue = value.toString();
  let normalizeStr = '0';
  let pointCounter = 0;
  for (const char of strValue) {
    if (char === '.') {
      if (pointCounter) break;
      pointCounter++;
    } else if (char < '0' || char > '9') {
      break;
    } else if (char === '0' && normalizeStr === '0') {
      continue;
    } else if (char >= '1' && char <= '9' && normalizeStr === '0') {
      normalizeStr = '';
    }
    normalizeStr += char;
  }
  normalizeStr = priceFormat ? number2price(normalizeStr, { fixed }) : normalizeStr;
  return normalizeStr;
};
