import { DollarSign, Edit, Trash } from 'react-feather';
import moment from 'moment';
import { useFunctions } from '../../Hooks/useFuncions';
import classNames from 'classnames';

export const Table = ({bills, editBill, deleteBill, className, payBill}) => {
  const { formatCurrency } = useFunctions();

  return (
    <div className={"flex flex-col w-full p-10 gap-2" + className}>
      <div className="flex bg-zinc-50 py-5 px-8 rounded-t-lg">
        <div className="w-60">
          <span>Descrição</span>
        </div>
        <div className="w-60">
          <span>Valor</span>
        </div>
        <div className="w-60">
          <span>Referência</span>
        </div>
        <div className=""></div>
      </div>
      {bills.map((bill) => {
        return (
          <div
            className="flex py-5 px-8 border-b hover:bg-zinc-100 cursor-pointer transition-all"
            key={bill.id}
            onClick={() => onRowClick(bill.id)}
          >
            <div className={classNames("w-1 mr-1", {
              "bg-danger": bill.category.type == 'out',
              "bg-success": bill.category.type == 'in',
            })}>
              
            </div>
            <div className="w-60">
              <span>{bill.description}</span>
            </div>
            <div className="w-60">
              <span>{formatCurrency(bill.amount)}</span>
            </div>
            <div className="w-60">
              <span>{moment(bill.reference_date).format("D/MM/Y")}</span>
            </div>
            <div className="flex gap-2">
              <DollarSign
                size={20}
                className="text-success cursor-pointer hover:scale-125 transition-all"
                onClick={() => payBill(bill)}
              />
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
