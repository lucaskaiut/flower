import { useEffect, useState } from "react";
import { AdminLayout } from "../../AdminLayout";
import api from "../../../api.json";
import { Table } from "./Table";
import Drawer from "react-modern-drawer";
import { toast } from "react-toastify";

import "react-modern-drawer/dist/index.css";
import { Pagination } from "../../Components/Pagination";
import { Form } from "./Form";
import Loading from "react-loading";

export function Dashboard() {
  const initialBillForm = {
    description: "",
    category_id: "",
  };
  const [bills, setBills] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pageButtons, setPageButtons] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [billForm, setBillForm] = useState(initialBillForm);
  const [editingBill, setEditingBill] = useState(null);

  const fetchBills = (page = 1) => {
    setIsFetching(true);
    const response = api.bills;
    setBills(response.data);
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
  };

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const editBill = (bill) => {
    setBillForm(bill);
    setEditingBill(bill);
    toggleDrawer();
  };

  const deleteBill = (bill) => {
    console.log(bill.name);
  };

  const createBill = () => {
    setBillForm(initialBillForm);
    setEditingBill(null);
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setBillForm(initialBillForm);
    setIsDrawerOpen(false);
  };

  const setFieldValue = (field, value) => {
    setBillForm({
      ...billForm,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (!billForm?.name || !billForm?.type) {
      toast.error("Informe o nome e tipo da categoria", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "invalid-inserted-data",
      });

      return;
    }

    const method = editingBill ? "put" : "post";

    toggleDrawer();
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Fluxo de caixa</h1>
        <div className="flex justify-center items-center bg-white mt-10 shadow-4xl rounded-lg relative">
          <button
            className="absolute top-5 right-10 px-5 py-2 text-white bg-primary rounded-md"
            onClick={createBill}
          >
            Nova
          </button>
          <button
            className="absolute top-5 right-32 px-5 py-2 text-white bg-secondary rounded-md"
            onClick={toggleFilterDrawer}
          >
            Filtros
          </button>
          <div className="w-full mt-10">
            {isFetching ? (
              <div className="w-full flex justify-center p-10">
                <Loading type="spin" color="#00a6ce" />
              </div>
            ) : (
              <>
                <Table
                  bills={bills}
                  deleteBill={deleteBill}
                  editBill={editBill}
                />
                <Pagination
                  from={pagination.from}
                  to={pagination.to}
                  total={pagination.total}
                  pageButtons={pageButtons}
                  handlePaginate={fetchBills}
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
            {editingBill
              ? `Editando categoria ${editingBill.name}`
              : "Criando categoria"}
          </h1>
          <div className="flex flex-col justify-center mt-5 gap-4">
            <Form
              billForm={billForm}
              closeDrawer={closeDrawer}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      </Drawer>
      <Drawer
        open={isFilterDrawerOpen}
        className="min-w-max"
        direction="right"
        onClose={toggleFilterDrawer}
      ></Drawer>
    </AdminLayout>
  );
}
