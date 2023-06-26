import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { User } from "react-feather";
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = () => {
    if (!email || !password) {
      toast.error("Informe seu e-mail e senha para continuar", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: 'invalid-inserted-data',
      });
      return;
    }

    login(email, password);
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-primary">
      <div className="flex flex-col items-center justify-center border w-80 h-80 gap-5 p-5 bg-zinc-100 rounded-2xl relative">
        <div className="bg-primary border-zinc-100 border-4 h-24 w-24 absolute rounded-full mt-[-330px] flex justify-center items-center">
          <User size={48} className="text-white" />
        </div>
        <h2 className="self-start text-2xl font-bold">Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Informe seu E-Mail"
          value={email}
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          className="border-b-2 border-primary p-2 w-full outline-primary"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Informe sua senha"
          id="password"
          className="border-b-2 border-primary p-2 w-full outline-primary"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="p-2 border rounded-md w-[50%] bg-primary text-white"
        >
          Login
        </button>
        <p>
          Novo por aqui?{" "}
          <Link className="text-blue-500" to="cadastrar">
            <b>Faça seu cadastro</b>
          </Link>
        </p>
      </div>
    </div>
  );
}
