import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import menu from "../../menu.json";

export const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col bg-white shadow-lg w-80 px-10 h-[calc(100vh-4rem)]">
      {menu.map((item, index) => {
        return (
          <Link
            to={item.path}
            key={index}
            className={classNames(
              "text-zinc-400 p-4 hover:bg-zinc-100 transition-all mt-4 rounded-lg",
              {
                "bg-zinc-100": pathname == item.path,
              }
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
