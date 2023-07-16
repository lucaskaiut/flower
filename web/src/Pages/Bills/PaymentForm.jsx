import { useState } from "react";

export const PaymentForm = ({ paymentMethods, onSubmit, closeDrawer }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    return (
        <>
            <select className="w-full border-2 rounded-lg p-4" onChange={event => setSelectedMethod(event.target.value)}>
                <option value="">Selecione a forma de pagamento</option>
                {paymentMethods.map(paymentMethod => {
                    if (selectedMethod == paymentMethod.id) {
                        return (
                            <option key={paymentMethod.id} selected value={paymentMethod.id}>{paymentMethod.name}</option>
                        )
                    }

                    return (
                        <option key={paymentMethod.id} value={paymentMethod.id}>{paymentMethod.name}</option>
                    )
                })}
            </select>
            <div className="w-full flex gap-2">
            <button
                className="px-5 py-2 flex-1 bg-primary text-white font-semibold rounded-md"
                onClick={() => onSubmit(selectedMethod)}
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
}