import { useEffect, useState } from "react";
import { AdminLayout } from "../../AdminLayout";
import api from "../../../api.json";
import { Table } from "./Table";
import Drawer from "react-modern-drawer";
import { toast } from "react-toastify";
import { Pagination } from "../../Components/Pagination";
import { Form } from "./Form";
import Loading from 'react-loading';

import "react-modern-drawer/dist/index.css";

export function PaymentMethod() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pageButtons, setPageButtons] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [paymentMethodForm, setPaymentMethodForm] = useState({
    name: "",
    type: "",
  });
  const [editingPaymentMethod, setEditingPaymentMethod] = useState(null);

  const fetchPaymentMethods = (page = 1) => {
    setIsFetching(true);

    setTimeout(() => {
      const response = api.paymentMethods;
      setPaymentMethods(response.data);
      setPagination(response.meta);
      let rows = [];

      for (let i = 0; i < response.meta.last_page; i++) {
        rows.push({
          label: i + 1,
          active: i + 1 == response.meta.current_page,
        });
      }

      setPageButtons(rows);

      setIsFetching(false);
    }, 2000);

    
  };

  const editPaymentMethod = (paymentMethod) => {
    setPaymentMethodForm(paymentMethod);
    setEditingPaymentMethod(paymentMethod);
    toggleDrawer();
  };

  const deletePaymentMethod = (paymentMethod) => {
    console.log(paymentMethod.name);
  };

  const createPaymentMethod = () => {
    setPaymentMethodForm(null);
    setEditingPaymentMethod(null);
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setPaymentMethodForm(null);
    setIsDrawerOpen(false);
  };

  const setFieldValue = (field, value) => {
    setPaymentMethodForm({
      ...paymentMethodForm,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (!paymentMethodForm?.name || !paymentMethodForm?.fee) {
      toast.error("Informe o nome e taxa do método de pagamento", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "invalid-inserted-data",
      });

      return;
    }

    const method = editingPaymentMethod ? "put" : "post";

    toggleDrawer();
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Métodos de pagamento</h1>
        <div className="flex justify-center items-center bg-white mt-10 shadow-4xl rounded-lg relative">
          <button
            className="absolute top-5 right-10 px-5 py-2 text-white bg-primary rounded-md"
            onClick={createPaymentMethod}
          >
            Nova
          </button>
          <div className="w-full mt-10">
            {isFetching ? (
              <div className="w-full flex justify-center p-10">
                <Loading type="spin" color="#00a6ce"/>
              </div>
            ) : (
              <>
                <Table
                  paymentMethods={paymentMethods}
                  deletePaymentMethod={deletePaymentMethod}
                  editPaymentMethod={editPaymentMethod}
                />
                <Pagination
                  from={pagination.from}
                  to={pagination.to}
                  total={pagination.total}
                  pageButtons={pageButtons}
                  handlePaginate={fetchPaymentMethods}
                  currentPage={pagination.current_page}
                  lastPage={pagination.last_page}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Drawer open={isDrawerOpen} className="min-w-max" direction="right">
        <div className="flex w-[600px] px-5 flex-col">
          <h1 className="text-bold text-2xl mt-5">
            {editingPaymentMethod
              ? `Editando método de pagamento ${editingPaymentMethod.name}`
              : "Criando método de pagamento"}
          </h1>
          <div className="flex flex-col justify-center mt-5 gap-4">
            <Form
              paymentMethodForm={paymentMethodForm}
              closeDrawer={closeDrawer}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
              isDrawerOpen={isDrawerOpen}
            />
          </div>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
