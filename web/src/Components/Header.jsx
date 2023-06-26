import { useAuth } from "../Hooks/useAuth";
import { Link } from 'react-router-dom';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-end bg-primary h-16 w-full">
      <div className="flex items-center mr-10">
        <div className="flex flex-col justify-end items-end mr-2 text-white">
          <span className="font-bold">{user.name}</span>
          <span className="cursor-pointer" onClick={logout}>
            Sair
          </span>
        </div>
        <Link to="/perfil">
          <img
            src={user.avatar}
            height="55"
            width="55"
            alt="Avatar do usuário logado"
            className="rounded-full cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
};
