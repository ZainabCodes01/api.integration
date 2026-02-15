/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AddUserSchema, type AddUserForm } from "./Validation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import {
  getUsers,
  addUser,
  updateUser,
  type UserData,
} from "../../features/UserSlice";
import ModalBox from "../../component/ModalBox";
import Input from "../../component/Input";

export default function AddUsers({ userId, closeModal }: any) {
  const [uiState, setUiState] = useState({
    message: "",
    showConfirmModal: false,
    pendingData: null as AddUserForm | null,
    isSaving: false,
    showSuccessAnim: false,
  });

  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddUserForm>({
    resolver: zodResolver(AddUserSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const existingUser = users.find((user: UserData) => user.id === userId);
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };

        if (existingUser) {
          setValue("firstName", existingUser.firstName ?? '');
          setValue("lastName", existingUser.lastName ?? '');
          setValue("email", existingUser.email ?? '');
          setValue("gender", existingUser.gender ?? '');
          setValue("birthDate", formatDate(existingUser.birthDate ?? ''));
        } else {
          try {
            const response = await axios.get(`https://dummyjson.com/users/${userId}`);
            const user = response.data;
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("email", user.email);
            setValue("gender", user.gender);
            setValue("birthDate", formatDate(user.birthDate));
          } catch {
            setUiState((prev) => ({ ...prev, message: "User not found" }));
          }
        }
      }
    };
    fetchUser();
  }, [userId, users, setValue]);

  const handleSaveUser = async (data: AddUserForm) => {
    setUiState((prev) => ({ ...prev, isSaving: true }));

    try {
      await new Promise((r) => setTimeout(r, 1000));

      if (userId) {
        if (userId <= 208) {
          await axios.put(`/api/users/${userId}`, data);
        }
        dispatch(updateUser({ id: userId, ...data }));
        setUiState((prev) => ({ ...prev, message: "User updated successfully" }));
      } else {
        const response = await axios.post("/api/users/add", data);
        if (response.status === 200 || response.status === 201) {
          dispatch(addUser(response.data));
        }
        setUiState((prev) => ({ ...prev, message: "User added successfully" }));
      }

      // ✅ Success Animation
      setUiState((prev) => ({ ...prev, showSuccessAnim: true }));
      setTimeout(() => {
        setUiState({
          message: "",
          showConfirmModal: false,
          pendingData: null,
          isSaving: false,
          showSuccessAnim: false,
        });
        closeModal();
      }, 1000);
    } catch (error) {
      console.error("Save error:", error);
      setUiState((prev) => ({
        ...prev,
        message: "Error saving user",
        isSaving: false,
      }));
    }
  };


  const onSubmit = (data: AddUserForm) => {
    setUiState((prev) => ({
      ...prev,
      pendingData: data,
      showConfirmModal: true,
    }));
  };

  return (
    <ModalBox closeModal={closeModal}>
      <h1 className="text-2xl font-bold text-center text-sky-700 mb-6 mt-5">
        {userId ? "Edit User" : "Create New User"}
      </h1>

      <form
        className="max-w-sm mx-auto space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <Input
            {...register("firstName")}
            placeholder="Enter first name"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <Input
            {...register("lastName")}
            placeholder="Enter last name"
            
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            {...register("email")}
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select {...register("gender")} className="border p-2 rounded w-full">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Birth Date</label>
          <Input
            type="date"
            {...register("birthDate")}
            className="border p-2 rounded w-full"
          />
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-900 w-full transition-all duration-300"
        >
          {userId ? "Update User" : "Save User"}
        </button>

        {uiState.message && <p className="text-green-600 text-center mt-3">{uiState.message}</p>}
      </form>


      {uiState.showConfirmModal && (
        <ModalBox
          closeModal={() =>
            setUiState((prev) => ({ ...prev, showConfirmModal: false }))
          }
        >
          {!uiState.isSaving && !uiState.showSuccessAnim && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-center text-gray-800">
                {userId ? "Update User?" : "Save New User?"}
              </h2>
              <p className="text-gray-600 text-center mt-2">
                Are you sure you want to {userId ? "update" : "save"} this user?
              </p>
              <div className="flex justify-center gap-4 mt-5">
                <button
                  onClick={() =>
                    uiState.pendingData && handleSaveUser(uiState.pendingData)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg duration-300"
                >
                  Yes, {userId ? "Update" : "Save"}
                </button>
                <button
                  onClick={() =>
                    setUiState((prev) => ({ ...prev, showConfirmModal: false }))
                  }
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {uiState.isSaving && !uiState.showSuccessAnim && (
            <motion.div
              key="saving"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-3 py-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"
              />
              Saving...
            </motion.div>
          )}

          {uiState.showSuccessAnim && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-6 space-y-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-green-500 text-4xl"
              >
                <Icon icon="mdi:check-circle" width="40" height="40" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-green-600 font-semibold"
              >
                Saved Successfully!
              </motion.p>
            </motion.div>
          )}
        </ModalBox>
      )}
    </ModalBox>
  );
}
