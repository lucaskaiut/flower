import { useEffect, useState } from "react";
import { AdminLayout } from "../../AdminLayout";
import api from "../../../api.json";
import { Table } from "./Table";
import Drawer from "react-modern-drawer";
import { toast } from "react-toastify";

import "react-modern-drawer/dist/index.css";
import { Form } from "./Form";
import { Pagination } from "../../Components/Pagination";
import Loading from "react-loading";

export function User() {
  const [users, setUsers] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pagination, setPagination] = useState({});
  const [pageButtons, setPageButtons] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    type: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () => {
    setIsFetching(true);
    const response = api.users;
    setPagination(response.meta);
    setUsers(response.data);

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

  const editUser = (user) => {
    setUserForm(user);
    setEditingUser(user);
    toggleDrawer();
  };

  const deleteUser = (user) => {
    console.log(user.name);
  };

  const createUser = () => {
    setUserForm(null);
    setEditingUser(null);
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setUserForm(null);
    setIsDrawerOpen(false);
  };

  const setFieldValue = (field, value) => {
    setUserForm({
      ...userForm,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (
      !userForm?.name ||
      !userForm?.email ||
      (!editingUser && !userForm?.password)
    ) {
      toast.error("Informe o nome e email do usuário", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "invalid-inserted-data",
      });

      return;
    }

    const method = editingUser ? "put" : "post";

    toggleDrawer();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="flex px-8 pt-4 flex-col flex-auto">
        <h1 className="font-bold text-4xl">Usuários</h1>
        <div className="flex justify-center items-center bg-white mt-10 shadow-4xl rounded-lg relative">
          <button
            className="absolute top-5 right-10 px-5 py-2 text-white bg-primary rounded-md"
            onClick={createUser}
          >
            Novo
          </button>
          <div className="w-full mt-10">
            {isFetching ? (
              <div className="w-full flex justify-center p-10">
                <Loading type="spin" color="#00a6ce" />
              </div>
            ) : (
              <>
                <Table
                  users={users}
                  deleteUser={deleteUser}
                  editUser={editUser}
                />
                <Pagination
                  from={pagination.from}
                  to={pagination.to}
                  total={pagination.total}
                  pageButtons={pageButtons}
                  handlePaginate={fetchUsers}
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
            {editingUser
              ? `Editando usuário ${editingUser.name}`
              : "Criando usuário"}
          </h1>
          <div className="flex flex-col justify-center mt-5 gap-4">
            <Form
              userForm={userForm}
              setFieldValue={setFieldValue}
              handleSubmit={handleSubmit}
              closeDrawer={closeDrawer}
            />
          </div>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
