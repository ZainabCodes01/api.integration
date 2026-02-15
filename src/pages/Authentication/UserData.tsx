
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, type ChangeEvent } from "react";
import Pagination from "../../component/Pagination";
import { type UserData, getUsers, setUsers } from "../../features/UserSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { InputDataSchema } from "../CRUD/Validation";
import AddUsers from "../CRUD/AddUsers";
import ConfirmDelete from "../CRUD/ConfirmDelete";
import RenderByRole from "./RenderByRole";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import ModalBox from "../../component/ModalBox";
import Input from "../../component/Input";
import CursorFollower from "../../CursorFollower";

export default function UserData({ showActions = false }: { showActions?: boolean }) {

  const [array] = useState([10, 25, 35, 45]);
  const userPropArray = [
    { label: "Id", key: "id" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" },
    { label: "Birth Date", key: "birthDate" },
  ];

  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const users = useSelector(getUsers);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();


  useEffect(() => {
    setSearchTerm("");
  }, [selectedCategory]);


  useEffect(() => {
    if (users.length === 0) {
      fetchUsers({
        page: 1,
        limit: pageSize,
      });
    } else {
      setFilteredUsers(users);
      setTotalUsers(users.length);
    }
  }, []);

  // useEffect(() => {
  //   setFilteredUsers(users);
  //   setTotalUsers(users.length);
  // }, [users]);




  const [modalState, setModalState] = useState({
    showAddEdit: false,
    showDelete: false,
    selectedUserId: null as number | null,
    userToDelete: null as number | null,
  });

  const openAddEditModal = (id?: number) => {
    setModalState({
      showAddEdit: true,
      showDelete: false,
      selectedUserId: id ?? null,
      userToDelete: null,
    });
  };

  const openDeleteModal = (id?: number) => {
    setModalState({
      showAddEdit: false,
      showDelete: true,
      selectedUserId: null,
      userToDelete: id ?? null,
    });
  };

  const closeModal = () => {
    setModalState({
      showAddEdit: false,
      showDelete: false,
      selectedUserId: null,
      userToDelete: null,
    });
  };




  // const fetchUsers = async (page: number, limit: number) => {
  //   setLoading(true);
  //   setError(null);
  //   const skip = (page - 1) * limit;
  //   const response = await axios.get(
  //     `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  //   );

  //   if (response.data.users) {
  //     const data = response.data.users;
  //     dispatch(setUsers(data));
  //     setFilteredUsers(data);
  //     setTotalUsers(response.data.total);
  //   } else {
  //     setError("No data found");
  //   }
  //   setLoading(false);
  // };


  // const handleFilter = async (key: string, value: string | number, page = 1) => {
  //   if (!key || !value) return;
  //   setLoading(true);
  //   setError(null);
  //   const response = await axios.get(
  //     `https://dummyjson.com/users/filter?key=${key}&value=${value}`
  //   );
  //   if (response.data.users && response.data.users.length > 0) {
  //     const allFiltered = response.data.users;
  //     setTotalUsers(allFiltered.length);
  //     const startIndex = (page - 1) * pageSize;
  //     const endIndex = startIndex + pageSize;
  //     const paginatedFiltered = allFiltered.slice(startIndex, endIndex);
  //     setFilteredUsers(paginatedFiltered);
  //     setCurrentPage(page);
  //   } else {
  //     setFilteredUsers([]);
  //     setError("No users found");
  //   }
  //   setLoading(false);
  // };


  const fetchUsers = async ({ page, limit, key, value }: { page: number, limit: number, key?: string, value?: string | number }) => {
    setLoading(true);
    setError(null);
    const skip = (page - 1) * limit;
    try {
      let response;
      if (key && value) {
        response = await axios.get(
          `/api/users/filter?key=${key}&value=${value}&limit=${limit}&skip=${skip}`
        );
        setHasSearched(true);
      } else {
        response = await axios.get(
          `/api/users?limit=${limit}&skip=${skip}`
        );
        setHasSearched(false);
      }

      if (response.data.users && response.data.users.length > 0) {
        setFilteredUsers(response.data.users);
        dispatch(setUsers(response.data.users));
        setTotalUsers(response.data.total);
        setCurrentPage(page);
      } else {
        setFilteredUsers([]);
        setError("Not Found");
        setTotalUsers(0);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }

    setLoading(false);
  };


  const getPlaceholder = () => {
    if (selectedCategory === "id") return "Enter ID (numeric)";
    if (selectedCategory === "firstName") return "Enter First Name";
    if (selectedCategory === "lastName") return "Enter Last Name";
    if (selectedCategory === "email") return "Enter Email (e.g. example@mail.com)";
    if (selectedCategory === "gender") return "Enter Gender(male/female/other)";
    if (selectedCategory === "birthDate") return "Enter Birth Date (yyyy-mm-dd)";
    return "Select a category first";
  };

  const getValidation = () => {
    if (selectedCategory === "id") return InputDataSchema.shape.searchTerm.shape.id;
    if (selectedCategory === "firstName") return InputDataSchema.shape.searchTerm.shape.firstName;
    if (selectedCategory === "lastName") return InputDataSchema.shape.searchTerm.shape.lastName;
    if (selectedCategory === "email") return InputDataSchema.shape.searchTerm.shape.email;
    if (selectedCategory === "gender") return InputDataSchema.shape.searchTerm.shape.gender;
    if (selectedCategory === "birthDate") return InputDataSchema.shape.searchTerm.shape.birthDate;
    return null;
  };



  const handleDeleteUser = async (id: number) => {
    try {
      const response = await axios.delete(`https://dummyjson.com/users/${id}`);

      if (response.status === 200) {
        const updated = filteredUsers.filter((u) => u.id !== id);
        setFilteredUsers(updated);
        dispatch(setUsers(updated));
      }
    } catch (error) {
      const updated = filteredUsers.filter((u) => u.id !== id);
      setFilteredUsers(updated);
      dispatch(setUsers(updated));
    }
  };


  const handleRefresh = () => {
    setSearchTerm("");
    setSelectedCategory("");
    fetchUsers({ page: 1, limit: pageSize });
  };


  const onPageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = Number(event.target.value);
    setPageSize(size);
    setCurrentPage(1);
    if (searchTerm && selectedCategory)
      fetchUsers({ page: 1, limit: size, key: selectedCategory, value: searchTerm });
    else
      fetchUsers({ page: 1, limit: size });
  };


  const handlePageChange = (page: number) => {
    if (selectedCategory && searchTerm)
      fetchUsers({ page, limit: pageSize, key: selectedCategory, value: searchTerm });
    else
      fetchUsers({ page, limit: pageSize });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const validation = getValidation();
    if (validation) {
      const result = validation.safeParse(value);
      if (!result.success) {
        setValidationError(result.error.issues[0].message);
      } else {
        setValidationError("");
      }
    }
  };


  const handleSearchClick = () => {
    const validation = getValidation();
    if (validation) {
      const result = validation.safeParse(searchTerm);
      if (!result.success) {
        setValidationError(result.error.issues[0].message);
        return;
      }
    }

    setValidationError("");
    fetchUsers({
      page: 1,
      limit: pageSize,
      key: selectedCategory,
      value: searchTerm,
    });
  };



  return (
    <div className="flex flex-col items-center py-16 bg-blue-100 min-h-screen">
      <CursorFollower/>
      {loading && (
        <div className="fixed inset-0 bg-white/70 flex flex-col items-center justify-center">
          <Icon
            icon="fa-spinner"
            className="animate-spin text-sky-600"
            width="80"
            height="80"
          />
          <p className="mt-4 text-sky-700 font-semibold text-lg">Loading...</p>
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        Users CRUD <span className="text-sky-600">By API</span>
      </h1>
      <p className="text-gray-500 mb-8">Manage users with a clean interface</p>


      <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center">

        <div className="w-full flex flex-wrap justify-between items-center gap-3 mb-6">
          {showActions && (
            <RenderByRole requiredRole="admin">
              <Button
                size="md"
                className="p-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md"
                onClick={() => openAddEditModal()}
              >
                Add User
              </Button>
            </RenderByRole>
          )}

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <div className="flex flex-col">
              <Input
                placeholder={getPlaceholder()}
                value={searchTerm}
                onChange={handleInputChange}
                disabled={!selectedCategory}
              />
              {validationError && (
                <p className="text-red-500 text-sm mt-1">{validationError}</p>
              )}
            </div>

            <select
              className="px-3 py-2 bg-sky-600 text-white rounded-lg shadow-md border border-sky-600"
              value={selectedCategory}
              onClick={() => {
                if (!role) {
                  alert("Please sign in to access this feature.");
                  navigate("/signin");
                }
              }}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValidationError("");
              }}
            >
              <option value="">Select Category</option>
              {userPropArray.map((user) => (
                <option value={user.key} key={user.key}>
                  {user.label}
                </option>
              ))}
            </select>

            <Button
              size="md"
              onClick={handleSearchClick}
              className="bg-sky-600 hover:bg-sky-700 text-white shadow-md flex items-center justify-center transition disabled:bg-gray-400"
              disabled={!selectedCategory || !searchTerm.trim() || !!validationError}
            >
              <Icon icon="mdi:magnify" width="22" height="22" />
            </Button>

            <Button
              size="md"
              onClick={handleRefresh}
              className="bg-sky-600 hover:bg-sky-700 text-white  shadow-md flex items-center justify-center transition disabled:bg-gray-400"
              disabled={
                !selectedCategory ||
                !searchTerm.trim() ||
                !hasSearched ||
                loading ||
                filteredUsers.length === 0
              }
            >
              <Icon icon="mdi:reload" width="22" height="22" />
            </Button>
          </div>


          <div className="flex items-center gap-4 justify-center">
            {/* <Button
              size="md"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("role");
                navigate("/login");
              }}

              className="bg-red-500 text-white  shadow-md hover:bg-red-600 transition"
            >
              Logout
            </Button> */}
            <select
              className="p-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md border border-sky-600"
              value={pageSize}
              onChange={onPageSizeChange}
            >
              {array.map((size) => (
                <option value={size} key={size}>
                  Size: {size}
                </option>
              ))}
            </select>
          </div>
        </div>


        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-center">
            <thead className="bg-sky-600 text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Image</th>
                <th className="px-6 py-3 text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-sm font-semibold">First Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Last Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Gender</th>
                <th className="px-6 py-3 text-sm font-semibold">Birth Date</th>
                {showActions && (
                  <RenderByRole requiredRole="admin">
                    <th className="px-6 py-3 text-sm font-semibold">Action</th>
                  </RenderByRole>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 transition-colors duration-300"
                >
                  <td className="px-6 py-3">
                    <img
                      src={user.image || "/Images/User.jpg"}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full border border-gray-300 shadow-sm mx-auto"
                    />
                  </td>
                  <td className="px-6 py-3 text-gray-700">{user.id}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3 text-gray-700">{user.gender}</td>
                  <td className="px-6 py-3 text-gray-700">{user.birthDate}</td>
                  {showActions && (
                    <RenderByRole requiredRole="admin">
                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openAddEditModal(user.id)}
                            className=" text-sm text-green-600 border border-green-400 hover:bg-green-500 hover:text-white transition-all"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteModal(user.id)}
                            className=" text-sm text-red-600 border border-red-400 hover:bg-red-500 hover:text-white transition-all"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </RenderByRole>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            totalUsers={totalUsers}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>


        {error && <p className="text-red-500 mt-4">{error}</p>}


        {(modalState.showAddEdit || modalState.showDelete) && (
          <ModalBox closeModal={closeModal}>
            {modalState.showAddEdit && (
              <AddUsers
                userId={modalState.selectedUserId}
                closeModal={closeModal}
              />
            )}
            {modalState.showDelete && (
              <ConfirmDelete
                closeModal={closeModal}
                onConfirm={() => {
                  if (modalState.userToDelete !== null)
                    handleDeleteUser(modalState.userToDelete);
                }}
              />
            )}
          </ModalBox>
        )}
      </div>
    </div>
  );
}
