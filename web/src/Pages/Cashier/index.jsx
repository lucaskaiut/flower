import { useEffect, useState } from "react"
import { AdminLayout } from "../../AdminLayout"
import api from '../../../api.json';
import { Table } from "./Table";
export const Cashier = () => {
  const [movements, setMovements] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchMovements = () => {
    setIsFetching(true);
    const response = api.cashier;
    setMovements(response.data);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Fluxo de caixa</h1>
        <div className="flex justify-center items-center bg-white mt-10 shadow-4xl rounded-lg relative">
        <Table movements={movements}/>
      </div>  
      </div>
    </AdminLayout>
  )
}