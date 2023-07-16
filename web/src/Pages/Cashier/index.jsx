import { useEffect, useState } from "react"
import { AdminLayout } from "../../AdminLayout"
import api from '../../../api.json';
import { Table } from "./Table";
import { DollarSign } from 'react-feather';
import { useFunctions } from "../../Hooks/useFuncions";
import Drawer from "react-modern-drawer";
import { toast } from "react-toastify";
import { Form } from "./Form";

export const Cashier = () => {
  const [movements, setMovements] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { formatCurrency } = useFunctions();
  const [amount, setAmount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const initialMovementForm = {
    description: "",
    category_id: "",
    amount: "",
    paid_at: "",
  };

  const [movementForm, setMovementForm] = useState(initialMovementForm);
  
  const fetchMovements = () => {
    setIsFetching(true);
    const response = api.cashier;
    setAmount(response.additional.amount);
    setMovements(response.data);
    setIsCashierOpen(response.additional.is_open);
    setIsFetching(false);
  }

  const fetchCategories = () => {
    setIsFetching(true);
    const response = api.categories;
    setCategories(response.data);
    setIsFetching(false);
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const createMovement = () => {
    toggleDrawer();
  }

  const handleSubmit = () => {
    if (!movementForm.amount || !movementForm.category_id || !movementForm.description || !movementForm.paid_at) {
      toast.error("Todos os campos são obrigatórios", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "invalid-inserted-data",
      });

      return;
    }
  }

  const setFieldValue = (field, value) => {
    setMovementForm({
      ...movementForm,
      [field]: value
    });
  }

  const closeDrawer = () => {
    setMovementForm(initialMovementForm);
    toggleDrawer();
  }

  const closeCashier = () => {

  }

  const openCashier = () => {
    fetchMovements();
  }

  useEffect(() => {
    fetchMovements();
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Fluxo de caixa</h1>
        <div className="w-full pt-10">
            <div className="w-60 h-32 rounded-lg flex bg-white">
              <div className="h-full w-20 rounded-s-lg bg-success flex items-center justify-center">
                <DollarSign size={40} className="text-white"/>
              </div>
              <div className="flex flex-col ml-10 justify-center w-full">
                <p className="font-thin">Saldo disponível</p>
                <p className="font-bold text-2xl">{ formatCurrency(amount) }</p>
              </div>
            </div>
          </div>  
        <div className="flex flex-col justify-center items-center relative bg-white mt-10 shadow-4xl rounded-lg">
          { isCashierOpen ? (
            <button onClick={() => closeCashier()} className="bg-danger hover:brightness-90 transition-all px-5 py-2 rounded-lg absolute top-2 right-24 text-white">Fechar Caixa</button>
          ) : (
            <button onClick={() => openCashier()} className="bg-success hover:brightness-90 transition-all px-5 py-2 rounded-lg absolute top-2 right-24 text-white">Abrir Caixa</button>
          )}
          <button onClick={() => createMovement()} className="bg-primary hover:brightness-90 transition-all px-5 py-2 rounded-lg absolute top-2 right-2 text-white">Nova</button>
          <Table movements={movements}/>
        </div>  
      </div>
      <Drawer open={isDrawerOpen} className="min-w-max" direction="right">
        <div className="flex w-[600px] px-5 flex-col">
          <h1 className="text-bold text-2xl mt-5">
            Criando movimento de caixa
          </h1>
          <div className="flex flex-col justify-center mt-5 gap-4">
            <Form
              movementForm={movementForm}
              isDrawerOpen={isDrawerOpen}
              closeDrawer={closeDrawer}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
              categories={categories}
            />
          </div>
        </div>
      </Drawer>
    </AdminLayout>
  )
}