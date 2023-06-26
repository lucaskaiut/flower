import { Edit, Trash } from 'react-feather';
import moment from 'moment';

export const Table = ({users, editUser, deleteUser, className}) => {
  return (
    <div className={"flex flex-col w-full p-10 gap-2" + className}>
      <div className="flex justify-between bg-zinc-50 py-5 px-8 rounded-t-lg">
        <div className="">
          <span>Nome</span>
        </div>
        <div className="">
          <span>E-Mail</span>
        </div>
        <div className="">
          <span>Data de cadastro</span>
        </div>
        <div className=""></div>
      </div>
      {users.map((user) => {
        return (
          <div
            className="flex justify-between py-5 px-8 border-b hover:bg-zinc-100 cursor-pointer transition-all"
            key={user.id}
          >
            <div className="flex text-left">
              <span>{user.name}</span>
            </div>
            <div className="flex text-left">
              <span>{user.email}</span>
            </div>
            <div className="flex text-left">
              <span>{moment(user.created_at).format("D/MM/Y")}</span>
            </div>
            <div className="flex gap-2">
              <Edit
                size={20}
                className="cursor-pointer hover:scale-125 transition-all"
                onClick={() => editUser(user)}
              />
              <Trash
                size={20}
                className="text-red-700 cursor-pointer hover:scale-125 transition-all"
                onClick={() => deleteUser(user)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
