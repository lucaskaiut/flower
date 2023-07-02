export const Form = ({userForm, setFieldValue, handleSubmit}) => {
  return (
    <>
      <input
        type="text"
        id="name"
        placeholder="Nome"
        value={userForm?.name ?? ""}
        onChange={(event) => setFieldValue("name", event.target.value)}
        autoComplete="false"
        className="p-4 border-2 rounded-lg"
      />
      <input
        type="email"
        id="email"
        placeholder="E-Mail"
        value={userForm?.email ?? ""}
        onChange={(event) => setFieldValue("email", event.target.value)}
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
      </div>
    </>
  );
};
