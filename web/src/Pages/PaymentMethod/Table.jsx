import { Edit, Trash } from "react-feather";
import moment from "moment";

export const Table = ({
  paymentMethods,
  editPaymentMethod,
  deletePaymentMethod,
  className,
}) => {
  return (
    <div className={"flex flex-col w-full p-10 gap-2" + className}>
      <div className="flex justify-between bg-zinc-50 py-5 px-8 rounded-t-lg">
        <div className="">
          <span>Nome</span>
        </div>
        <div className="">
          <span>Data de cadastro</span>
        </div>
        <div className=""></div>
      </div>
      {paymentMethods.map((paymentMethod) => {
        return (
          <div
            className="flex justify-between py-5 px-8 border-b hover:bg-zinc-100 cursor-pointer transition-all"
            key={paymentMethod.id}
          >
            <div className="flex text-left">
              <span>{paymentMethod.name}</span>
            </div>
            <div className="flex text-left">
              <span>{moment(paymentMethod.created_at).format("D/MM/Y")}</span>
            </div>
            <div className="flex gap-2">
              <Edit
                size={20}
                className="cursor-pointer hover:scale-125 transition-all"
                onClick={() => editPaymentMethod(paymentMethod)}
              />
              <Trash
                size={20}
                className="text-danger cursor-pointer hover:scale-125 transition-all"
                onClick={() => deletePaymentMethod(paymentMethod)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
