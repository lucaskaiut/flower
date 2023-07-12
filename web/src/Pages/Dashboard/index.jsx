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
import { Filter } from "./Filters";
import { useFunctions } from "../../Hooks/useFuncions";
import { TotalCard } from "./TotalCard";
import { Badge } from "./Badge";
import moment from "moment";

export function Dashboard() {
  const {formatCurrency} = useFunctions();
  const initialBillForm = {
    description: "",
    category_id: "",
    amount: "",
    date_start: "",
    date_end: ""
  };
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pageButtons, setPageButtons] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [billForm, setBillForm] = useState(initialBillForm);
  const [editingBill, setEditingBill] = useState(null);
  const [totals, setTotals] = useState({
    in: 0,
    out: 0,
    status: 0
  });

  const initialFilters = {
    description: "",
    category_id: "",
    valueFrom: "",
    valueTo: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const fetchBills = (page = 1) => {
    setIsFetching(true);
    const response = api.bills;
    setBills(response.data);
    setTotals(response.additional.totals);
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

  const setFilterFieldValue = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const handleFilter = () => {
    toggleFilterDrawer();

    fetchCategories();
  };

  const fetchCategories = () => {
    setIsFetching(true);
    let cleandFilters = filters;
    
    Object.keys(cleandFilters).forEach(key => {
      if (!cleandFilters[key]) {
        delete cleandFilters[key];
      }
    });
    
    const queryParams = new URLSearchParams(cleandFilters).toString();

    const response = api.categories;

    setCategories(response.data);
    setIsFetching(false);
  };

  const handleSubmit = () => {
    if (!billForm?.description || !billForm?.category_id) {
      toast.error("Informe o nome e tipo da categoria", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "invalid-inserted-data",
      });

      return;
    }

    if (billForm.id !== undefined) {
      console.log("updating", { billForm });
      //put
    } else {
      // post
      console.log("creating", { billForm });
    }

    toggleDrawer();

    return;
  };

  const getFilterLabel = (key, value) => {
    const labels = {
      description: "Descrição",
      category_id: "Categoria",
      valueFrom: "A partir",
      valueTo: "Até",
      dateFrom: 'De',
      dateTo: 'Até',
    }

    if (['valueFrom', 'valueTo'].includes(key)) {
      value = formatCurrency(value);
    }

    if (['dateFrom', 'dateTo'].includes(key)) {
      value = moment(value).format('DD/MM/Y');
    }

    if (key == 'category_id') {
      value = getCategoryName(value);
    }

    return labels[key] + ': ' + value;
  }

  const getCategoryName = id => {
    const category = categories.find(category => {return category.id == id});

    return category.name;
  }

  const removeFilter = (key) => {
    setFilterFieldValue(key, "");

    fetchCategories();
  }

  useEffect(() => {
    fetchBills();
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Fluxo de caixa</h1>
        <div className="flex justify-between mt-5">
          <TotalCard total={totals.in} type="in"/>
          <TotalCard total={totals.out} type="out"/>
          <TotalCard total={totals.status} type="status"/>
        </div>
        <div className="flex justify-center items-center bg-white mt-10 shadow-4xl rounded-lg relative">
          <div className="absolute top-4 right-60 flex gap-2 py-2 items-center justify-center">
            {Object.keys(filters).map(key => {
              return filters[key] && (
                <Badge label={getFilterLabel(key, filters[key])} removeFilter={() => removeFilter(key)}/>
              )
            })}
          </div>
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
              ? `Editando conta`
              : "Criando conta"}
          </h1>
          <div className="flex flex-col justify-center mt-5 gap-4">
            <Form
              billForm={billForm}
              isDrawerOpen={isDrawerOpen}
              closeDrawer={closeDrawer}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
              categories={categories}
            />
          </div>
        </div>
      </Drawer>
      <Drawer
        open={isFilterDrawerOpen}
        className="min-w-max"
        direction="right"
        onClose={toggleFilterDrawer}
      >
        <div className="flex flex-col justify-center mt-5 gap-4 w-[600px] px-5">
          <h1 className="text-bold text-2xl mt-5">Filtros</h1>
          <Filter
            filters={filters}
            handleFilter={handleFilter}
            categories={categories}
            setFieldValue={setFilterFieldValue}
            toggleDrawer={toggleFilterDrawer}
          />
        </div>
      </Drawer>
    </AdminLayout>
  );
}
