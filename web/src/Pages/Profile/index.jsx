import { AdminLayout } from "../../AdminLayout";
import { useAuth } from "../../Hooks/useAuth";

export const Profile = () => {
  const { user } = useAuth();
  return (
    <AdminLayout>
      <h1>Olá, {user.name}</h1>
    </AdminLayout>
  );
};
