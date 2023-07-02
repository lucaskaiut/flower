import { AdminLayout } from "../../AdminLayout";
import { useAuth } from "../../Hooks/useAuth";
import { Form } from "./Form";

export const Profile = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Meu Perfil</h1>
        <div className="flex justify-center items-center bg-white mt-10 shadow-4xl rounded-lg relative">
          <img src={user.avatar} alt="" className="rounded-full top-[-60px] w-40 border-8 border-white absolute"/>
          <div className="mt-40 flex flex-col gap-2 w-96">
            <Form userForm={user}/>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
