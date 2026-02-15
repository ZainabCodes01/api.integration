import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema, type AddUserForm } from "./pages/CRUD/Validation";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUsers, addUser, updateUser, type UserData } from "./features/UserSlice";


export default function AddUsers() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id ? Number(id) : null;
  const users = useSelector(getUsers);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddUserForm>({
    resolver: zodResolver(AddUserSchema),
  });


  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const existingUser = users.find((user: UserData) => user.id === userId);

        if (existingUser) {
          setValue("firstName", existingUser.firstName ?? "");
          setValue("email", existingUser.email ?? "");
          setValue("gender", existingUser.gender ?? "");
          setValue("birthDate", existingUser.birthDate ?? "");

        } else {
          const response = await axios.get(`https://dummyjson.com/users/${userId}`);
          const user = response.data;
          setValue("firstName", user.firstName);
          setValue("email", user.email); await
            setValue("gender", user.gender);
          setValue("birthDate", user.birthDate);
          setMessage("User not found");
        }
      } else {
        return ("User not existed");
      }
    };
    fetchUser();
  }, [userId, users, setValue]);



  const onSubmit = async (data: AddUserForm) => {
    try {
      if (userId) {
        if (userId <= 208) {
          await axios.put(`https://dummyjson.com/users/${userId}`, data);
          dispatch(updateUser({ id: userId, ...data }));
          setMessage("User updated successfully");
        }
        else {
          dispatch(updateUser({ id: userId, ...data }));
          setMessage("Local user updated successfully");
        }
      }
      else {
        const response = await axios.post(
          "https://dummyjson.com/users/add",
          data
        );
        if (response.status === 200 || response.status === 201) {
          dispatch(addUser(response.data));
          setMessage("User added successfully");
        } else {
          setMessage("Failed to add user");
        }
      }
      navigate("/");
      reset();
    } catch (error) {
      setMessage("Error saving user");
      console.error("Save error:", error);
    }
  };

  return (
    <div className="relative bg-blue-100 h-screen flex justify-center">
      <div className="absolute mt-11 w-full max-w-2xl mx-auto p-10 text-dark rounded-xl shadow-xl bg-white">
        <Link
          to="/"
          className="absolute top-4 left-4 text-blue-500 flex items-center gap-1"
        >
          <Icon icon="mdi-arrow-left" /> Back
        </Link>

        <h1 className="text-2xl font-bold text-center text-sky-700 mb-6 mt-5">
          {userId ? "Edit User" : "Create New User"}
        </h1>

        <form
          className="max-w-sm mx-auto space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              {...register("firstName")}
              placeholder="Enter your first name"
              className="border p-2 rounded w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="border p-2 rounded w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select {...register("gender")} className="border p-2 rounded w-full">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <input
              type="date"
              {...register("birthDate")}
              className="border p-2 rounded w-full"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-900 w-full"
          >
            {userId ? "Update User" : "Save User"}
          </button>
          {message && (
            <p className="text-green-600 text-center mt-3">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
