export const useFunctions = () => {
  const formatCurrency = (value) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const reverseString = (str) => {
    let newString = "";
 
    for (let i = str.length - 1; i >= 0; i--) { 
        newString += str[i]; 
    }

    return newString;
}

const maskString = (mask, value, reverse) => {
  let string = value.toString().replace(/[^\d]+/gi, "");

  if (reverse) {
    string = reverseString(string);
    mask = reverseString(mask);
  }

  let result = '';

  for (var x = 0, y = 0; x < mask.length && y < string.length; ) {
    if (mask.charAt(x) != "#") {
      result += mask.charAt(x);
      x++;
    } else {
      result += string.charAt(y);
      y++;
      x++;
    }
  }

  return reverse ? reverseString(result) : result;
}

const maskDateValue = (value) => {
  const maskedValue = maskString('##/##/####', value);

  let rawValue = maskedValue.split('/');

  rawValue = rawValue[2] + '-' + rawValue[1] + '-' + rawValue[0];

  return {
    rawValue,
    maskedValue
  }
}

const maskAmountValue = (value) => {
  const maskedValue = maskString('###.###.###.###.###,##', value, true);

  return {
    value: parseFloat(maskedValue.replace(".", "").replace(",", ".")),
    maskedValue: `R$ ${maskedValue}`
  }
};

const maskFloatValue = (value) => {
  const maskedValue = maskString('###.###.###.###,##', value, true);

  return {
    value: parseFloat(maskedValue.replace(".", "").replace(",", ".")),
    maskedValue
  }
}

  return {
    formatCurrency,
    maskAmountValue,
    maskDateValue,
    maskFloatValue,
  };
};
