import { useEffect, useState } from "react";
import api from "../../../api.json";
import { useFunctions } from "../../Hooks/useFuncions";

export const Form = ({
  billForm,
  setFieldValue,
  handleSubmit,
  closeDrawer,
}) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maskedAmount, setMaskedAmount] = useState(null);
  const { reverseString } = useFunctions();

  const fetchCategories = () => {
    setIsLoading(true);
    const response = api.categories;

    setCategories(response.data);
    setIsLoading(false);
  };

  const handleAmountChange = (value) => {
    let maskedValue = reverseString(value.toString().replace(/[^\d]+/gi, ""));

    const mask = reverseString("###.###.###.###.###,##");

    let result = "";

    for (var x = 0, y = 0; x < mask.length && y < maskedValue.length;) {
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

    setFieldValue('amount', parseFloat(result.replace(".", "").replace(",", ".")));

    setMaskedAmount(`R$ ${result}`);
  }

  useEffect(() => {
    fetchCategories();

    if (billForm) {
      handleAmountChange(billForm.amount?.toFixed(2) ?? 0);
    }
  }, []);
  
  return (
    <>
      <input
        type="text"
        id="description"
        placeholder="Descrição"
        value={billForm?.description ?? ""}
        onChange={(event) => setFieldValue("description", event.target.value)}
        autoComplete="false"
        className="p-4 border-2 rounded-lg"
      />
      <select
        className="border-2 p-4 rounded-lg"
        onChange={(event) => setFieldValue("category_id", event.target.value)}
      >
        <option value="">Selecione</option>
        {categories.map((category) => {
          if (category.id == billForm?.category_id) {
            return (
              <option value={category.id} selected>
                {category.name}
              </option>
            );
          } else {
            return <option value={category.id}>{category.name}</option>;
          }
        })}
      </select>
      <input
        type="text"
        id="amount"
        placeholder="Valor"
        value={maskedAmount}
        onChange={(event) => handleAmountChange(event.target.value)}
        autoComplete="false"
        className="p-4 border-2 rounded-lg"
      />
      <div className="w-full flex gap-2">
        <button
          className="px-5 py-2 flex-1 bg-primary text-white font-semibold rounded-md"
          onClick={handleSubmit}
        >
          Salvar
        </button>
        <button
          className="px-5 py-2 flex-1 bg-red-400 text-white font-semibold rounded-md"
          onClick={closeDrawer}
        >
          Cancelar
        </button>
      </div>
    </>
  );
};
