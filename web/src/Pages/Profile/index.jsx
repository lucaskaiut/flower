import { AdminLayout } from "../../AdminLayout";
import { useAuth } from "../../Hooks/useAuth";
import { Form } from "./Form";

export const Profile = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Meu Perfil</h1>
        <div className="flex mt-10 bg-white shadow-4xl rounded-lg ">
          <div className="flex flex-1 justify-center items-center flex-col relative">
            <img
              src={user.avatar}
              className="w-40 rounded-full border-white border-8"
            />
            <Form userForm={user} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
