import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Category } from "./Pages/Category";
import { User } from "./Pages/User";
import { Profile } from "./Pages/Profile";
import { PaymentMethod } from "./Pages/PaymentMethod";
import { Cashier } from "./Pages/Cashier";

export function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categorias" element={<Category />} />
        <Route path="/usuarios" element={<User />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/pagamentos" element={<PaymentMethod />} />
        <Route path="/caixa" element={<Cashier />} />
      </Routes>
    </>
  );
}
