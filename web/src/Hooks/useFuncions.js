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

  return {
    formatCurrency,
    reverseString
  };
};
