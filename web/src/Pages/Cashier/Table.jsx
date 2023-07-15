import moment from 'moment';
import { useFunctions } from '../../Hooks/useFuncions';
import classNames from 'classnames';

export const Table = ({movements, className}) => {
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
        <div className="w-60">
          <span>Data de pagamento</span>
        </div>
        <div className=""></div>
      </div>
      {movements.map((movement) => {
        return (
          <div
            className="flex py-5 px-8 border-b hover:bg-zinc-100 cursor-pointer transition-all"
            key={movement.id}
            onClick={() => onRowClick(movement.id)}
          >
            <div className={classNames("w-1 mr-1", {
              "bg-danger": movement.category.type == 'out',
              "bg-success": movement.category.type == 'in',
            })}>
              
            </div>
            <div className="w-60">
              <span>{movement.description}</span>
            </div>
            <div className="w-60">
              <span>{formatCurrency(movement.amount)}</span>
            </div>
            <div className="w-60">
              <span>{moment(movement.reference_date).format("D/MM/Y")}</span>
            </div>
            <div className="w-60">
              <span>{moment(movement.paid_at).format("D/MM/Y")}</span>
            </div>
            <div className="flex gap-2">
            </div>
          </div>
        );
      })}
    </div>
  );
};
