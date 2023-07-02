export const Filter = ({
  handleFilter,
  setFieldValue,
  toggleDrawer,
  filters,
  categories
}) => {
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
          onChange={event => setFieldValue("valueFrom", event.target.value)}
        />
        <input
          type="text"
          placeholder="Valor até"
          className="p-4 border-2 rounded-lg flex-1"
          onChange={event => setFieldValue("valueTo", event.target.value)}
        />
      </div>
      <select
        className="border-2 p-4 rounded-lg"
        onChange={event => setFieldValue("category_id", event.target.value)}
      >
        <option value="">Selecione</option>
        {categories.map((category) => {
          return <option value={category.id}>{category.name}</option>;
        })}
      </select>
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
