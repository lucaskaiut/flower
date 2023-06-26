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

export function Category() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pageButtons, setPageButtons] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    type: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = (page = 1) => {
    setIsFetching(true);

    setTimeout(() => {
      const response = api.categories;
      setCategories(response.data);
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

  const editCategory = (category) => {
    setCategoryForm(category);
    setEditingCategory(category);
    toggleDrawer();
  };

  const deleteCategory = (category) => {
    console.log(category.name);
  };

  const createCategory = () => {
    setCategoryForm(null);
    setEditingCategory(null);
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setCategoryForm(null);
    setIsDrawerOpen(false);
  };

  const setFieldValue = (field, value) => {
    setCategoryForm({
      ...categoryForm,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (!categoryForm?.name || !categoryForm?.type) {
      toast.error("Informe o nome e tipo da categoria", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "invalid-inserted-data",
      });

      return;
    }

    const method = editingCategory ? "put" : "post";

    toggleDrawer();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Categorias</h1>
        <div className="flex justify-center items-center bg-white mt-10 shadow-4xl rounded-lg relative">
          <button
            className="absolute top-5 right-10 px-5 py-2 text-white bg-primary rounded-md"
            onClick={createCategory}
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
                  categories={categories}
                  deleteCategory={deleteCategory}
                  editCategory={editCategory}
                />
                <Pagination
                  from={pagination.from}
                  to={pagination.to}
                  total={pagination.total}
                  pageButtons={pageButtons}
                  handlePaginate={fetchCategories}
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
            {editingCategory
              ? `Editando categoria ${editingCategory.name}`
              : "Criando categoria"}
          </h1>
          <div className="flex flex-col justify-center mt-5 gap-4">
            <Form
              categoryForm={categoryForm}
              closeDrawer={closeDrawer}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
