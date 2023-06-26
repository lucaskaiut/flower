export const Form = ({categoryForm, setFieldValue, handleSubmit, closeDrawer}) => {
  return (
    <>
      <input
        type="text"
        id="name"
        placeholder="Nome"
        value={categoryForm?.name ?? ""}
        onChange={(event) => setFieldValue("name", event.target.value)}
        autoComplete="false"
        className="p-4 border-2 rounded-lg"
      />
      <select
        className="border-2 p-4 rounded-lg"
        onChange={(event) => setFieldValue("type", event.target.value)}
      >
        <option value="">Selecione</option>
        {categoryForm?.type == "in" ? (
          <option value="in" selected>
            Entrada
          </option>
        ) : (
          <option value="in">Entrada</option>
        )}
        {categoryForm?.type == "out" ? (
          <option value="out" selected>
            Saída
          </option>
        ) : (
          <option value="out">Saída</option>
        )}
      </select>
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
