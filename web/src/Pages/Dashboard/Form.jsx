import { useEffect, useState } from "react";
import { useFunctions } from "../../Hooks/useFuncions";
import moment from "moment";

export const Form = ({
  billForm,
  setFieldValue,
  handleSubmit,
  closeDrawer,
  isDrawerOpen,
  categories
}) => {
  const [maskedAmount, setMaskedAmount] = useState("");
  const [maskedDueAt, setMaskedDueAt] = useState("");
  const { maskAmountValue, maskDateValue } = useFunctions();

  const handleAmountChange = (rawValue) => {
    const { value, maskedValue } = maskAmountValue(rawValue);
    setFieldValue("amount", value);
    setMaskedAmount(maskedValue);
  }

  const handleDateChange = (value, key) => {
    const { rawValue, maskedValue } = maskDateValue(value);
    setFieldValue(key, rawValue);

    setMaskedDueAt(maskedValue);
  };

  useEffect(() => {
    if (billForm && billForm.amount !== "") {
      handleAmountChange(billForm?.amount?.toFixed(2) ?? "")
    } else {
      setMaskedAmount("");
    }

    setMaskedDueAt(moment(billForm.due_at).format('DD/MM/Y'));
  }, [isDrawerOpen]);

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
        placeholder="Vencimento"
        className="p-4 border-2 rounded-lg flex-1"
        value={maskedDueAt}
        onChange={(event) =>
          handleDateChange(event.target.value, "due_at")
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
