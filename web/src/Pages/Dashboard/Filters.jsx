import { useState } from "react";
import { useFunctions } from "../../Hooks/useFuncions";

export const Filter = ({
  handleFilter,
  setFieldValue,
  toggleDrawer,
  filters,
  categories,
}) => {
  const [maskedFrom, setMaskedFrom] = useState("");
  const [maskedTo, setMaskedTo] = useState("");
  const [maskedDateFrom, setMaskedDateFrom] = useState("");
  const [maskedDateTo, setMaskedDateTo] = useState("");
  const { maskAmountValue, maskDateValue } = useFunctions();

  const handleAmountChange = (value, key) => {
    const { value: amount, maskedValue } = maskAmountValue(value);
    setFieldValue(key, amount);

    const functions = {
      valueFrom: setMaskedFrom,
      valueTo: setMaskedTo,
    };

    functions[key](maskedValue);
  };

  const handleDateChange = (value, key) => {
    const { rawValue, maskedValue } = maskDateValue(value);
    setFieldValue(key, rawValue);

    const functions = {
      dateFrom: setMaskedDateFrom,
      dateTo: setMaskedDateTo,
    };

    functions[key](maskedValue);
  };

  return (
    <>
      <input
        type="text"
        id="description"
        placeholder="Descrição"
        autoComplete="false"
        value={filters.description}
        onChange={(event) => setFieldValue("description", event.target.value)}
        className="p-4 border-2 rounded-lg"
      />
      <div className="w-full flex gap-2">
        <input
          type="text"
          placeholder="Valor a partir"
          className="p-4 border-2 rounded-lg flex-1"
          value={maskedFrom}
          onChange={(event) =>
            handleAmountChange(event.target.value, "valueFrom")
          }
        />
        <input
          type="text"
          placeholder="Valor até"
          className="p-4 border-2 rounded-lg flex-1"
          value={maskedTo}
          onChange={(event) =>
            handleAmountChange(event.target.value, "valueTo")
          }
        />
      </div>
      <select
        className="border-2 p-4 rounded-lg"
        onChange={(event) => setFieldValue("category_id", event.target.value)}
      >
        <option value="">Selecione</option>
        {categories.map((category) => {
          return <option value={category.id} key={category.id}>{category.name}</option>;
        })}
      </select>
      <div className="w-full flex gap-2">
        <input
          type="text"
          value={maskedDateFrom}
          placeholder="A partir de"
          onChange={(event) => handleDateChange(event.target.value, "dateFrom")}
          className="border-2 p-4 rounded-lg flex-1"
        />
        <input
          type="text"
          value={maskedDateTo}
          placeholder="Até"
          onChange={(event) => handleDateChange(event.target.value, "dateTo")}
          className="border-2 p-4 rounded-lg flex-1"
        />
      </div>

      <div className="w-full flex gap-2">
        <button
          className="px-5 py-2 flex-1 bg-primary text-white font-semibold rounded-md"
          onClick={handleFilter}
        >
          Filtrar
        </button>
        <button
          className="px-5 py-2 flex-1 bg-red-400 text-white font-semibold rounded-md"
          onClick={toggleDrawer}
        >
          Cancelar
        </button>
      </div>
    </>
  );
};
