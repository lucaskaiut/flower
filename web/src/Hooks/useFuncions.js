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

const maskAmountValue = (value) => {
  let maskedValue = reverseString(value.toString().replace(/[^\d]+/gi, ""));

  const mask = reverseString("###.###.###.###.###,##");

  let result = "";

  for (var x = 0, y = 0; x < mask.length && y < maskedValue.length; ) {
    if (mask.charAt(x) != "#") {
      result += mask.charAt(x);
      x++;
    } else {
      result += maskedValue.charAt(y);
      y++;
      x++;
    }
  }

  result = reverseString(result);

  return {
    value: parseFloat(result.replace(".", "").replace(",", ".")),
    maskedValue: `R$ ${result}`
  }
};

  return {
    formatCurrency,
    maskAmountValue
  };
};
