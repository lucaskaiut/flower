import { useEffect, useState } from "react";
import { useFunctions } from "../../Hooks/useFuncions";

export const Form = ({
  movementForm,
  setFieldValue,
  handleSubmit,
  closeDrawer,
  isDrawerOpen,
  categories
}) => {
  const [maskedAmount, setMaskedAmount] = useState("");
  const { maskAmountValue, maskDateValue } = useFunctions();
  const [maskedPaidAt, setMaskedPaidAt] = useState("");

  const handleAmountChange = (rawValue) => {
    const { value, maskedValue } = maskAmountValue(rawValue);
    setFieldValue("amount", value);
    setMaskedAmount(maskedValue);
  }

  const handleDateChange = (value, key) => {
    const { rawValue, maskedValue } = maskDateValue(value);
    setFieldValue(key, rawValue);

    setMaskedPaidAt(maskedValue);
  };

  useEffect(() => {
    if (movementForm && movementForm.amount !== "") {
      handleAmountChange(movementForm?.amount?.toFixed(2) ?? "")
    } else {
      setMaskedAmount("");
    }
  }, [isDrawerOpen]);

  return (
    <>
      <input
        type="text"
        id="description"
        placeholder="Descrição"
        value={movementForm?.description ?? ""}
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
          if (category.id == movementForm?.category_id) {
            return (
              <option value={category.id} selected key={category.id}>
                {category.name}
              </option>
            );
          } else {
            return <option value={category.id} key={category.id}>{category.name}</option>;
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
      <input
          type="text"
          placeholder="Data de pagamento"
          className="p-4 border-2 rounded-lg flex-1"
          value={maskedPaidAt}
          onChange={(event) =>
            handleDateChange(event.target.value, "paid_ad")
          }
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
