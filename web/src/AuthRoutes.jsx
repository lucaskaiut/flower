import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Category } from "./Pages/Category";
import { User } from "./Pages/User";
import { Sidebar } from "./Components/Sidebar";
import { Profile } from "./Pages/Profile";

export function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categorias" element={<Category />} />
        <Route path="/usuarios" element={<User />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </>
  );
}
