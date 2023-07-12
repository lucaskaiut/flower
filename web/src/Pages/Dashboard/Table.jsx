import { Edit, Trash } from 'react-feather';
import moment from 'moment';
import { useFunctions } from '../../Hooks/useFuncions';

export const Table = ({bills, editBill, deleteBill, className}) => {
  const { formatCurrency } = useFunctions();

  return (
    <div className={"flex flex-col w-full p-10 gap-2" + className}>
      <div className="flex justify-between bg-zinc-50 py-5 px-8 rounded-t-lg">
        <div className="">
          <span>Descrição</span>
        </div>
        <div className="">
          <span>Valor</span>
        </div>
        <div className="">
          <span>Referência</span>
        </div>
        <div className=""></div>
      </div>
      {bills.map((bill) => {
        return (
          <div
            className="flex justify-between py-5 px-8 border-b hover:bg-zinc-100 cursor-pointer transition-all"
            key={bill.id}
          >
            <div className="flex text-left">
              <span>{bill.description}</span>
            </div>
            <div className="flex text-left">
              <span>{formatCurrency(bill.amount)}</span>
            </div>
            <div className="flex text-left">
              <span>{moment(bill.reference_date).format("D/MM/Y")}</span>
            </div>
            <div className="flex gap-2">
              <Edit
                size={20}
                className="cursor-pointer hover:scale-125 transition-all"
                onClick={() => editBill(bill)}
              />
              <Trash
                size={20}
                className="text-danger cursor-pointer hover:scale-125 transition-all"
                onClick={() => deleteBill(bill)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
