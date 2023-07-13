import { useEffect, useState } from "react";
import { useFunctions } from "../../Hooks/useFuncions";

export const Form = ({paymentMethodForm, setFieldValue, handleSubmit, closeDrawer, isDrawerOpen}) => {
  const [maskedFee, setMaskedFee] = useState("");
  const { maskFloatValue } = useFunctions();

  const handleFeeChange = (rawValue) => {
    const { value, maskedValue } = maskFloatValue(rawValue);
    setFieldValue("fee", value);
    setMaskedFee(maskedValue);
  }

  useEffect(() => {
    if (paymentMethodForm && paymentMethodForm.fee !== "") {
      handleFeeChange(paymentMethodForm?.fee?.toFixed(2) ?? "")
    } else {
      setMaskedFee("");
    }
  }, [isDrawerOpen]);
  return (
    <>
      <div className="flex gap-2 w-full">
      <input
          type="text"
          id="name"
          placeholder="Nome"
          value={paymentMethodForm?.name ?? ""}
          onChange={(event) => setFieldValue("name", event.target.value)}
          autoComplete="false"
          className="p-4 border-2 rounded-lg flex-1"
        />
        <input
          type="text"
          id="fee"
          placeholder="Taxa"
          value={maskedFee}
          onChange={(event) => handleFeeChange(event.target.value)}
          autoComplete="false"
          className="p-4 border-2 rounded-lg flex-1"
        />
      </div>
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
