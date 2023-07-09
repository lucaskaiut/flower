import classNames from "classnames";
import { useFunctions } from "../../Hooks/useFuncions";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "react-feather";

export const TotalCard = ({ type, total }) => {
  const { formatCurrency } = useFunctions();

  const icons = {
    in: {
      icon: <ArrowUpCircle size={24} />,
      background: "green-500",
      text: 'Entradas'
    },
    out: {
      icon: <ArrowDownCircle size={24} />,
      background: "green-500",
      text: 'Saídas',
    },
    status: {
      icon: <DollarSign size={24} />,
      background: "secondary",
      text: 'Total',
    },
  };

  return (
    <div className="bg-white rounded-lg flex items-center">
      <div
        className={classNames(
          "text-white px-2 rounded-s-lg py-6 flex justify-center items-center h-full",
          {
            "bg-secondary": type == "status",
            "bg-danger": type == "out",
            "bg-success": type == "in",
          }
        )}
      >
        {icons[type].icon}
      </div>
      <div className="px-6 flex flex-col">
        <span>{icons[type].text}</span>
        <p className="font-bold">{formatCurrency(total)}</p>
      </div>
    </div>
  );
};
