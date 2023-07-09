import { X } from "react-feather";

export const Badge = ({ label, removeFilter }) => {
  return (
    <div className="text-xs bg-secondary text-white p-2 rounded-md flex gap-3 items-center">
      <div className="cursor-pointer" onClick={removeFilter}>
        <X size={14} />
      </div>
      {label}
    </div>
  );
};
