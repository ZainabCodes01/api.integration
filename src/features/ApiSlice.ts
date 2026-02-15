import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserData } from "./UserSlice";

interface UserResponse {
    users : UserData[];
    total: number;
}

export const apiSlice = createApi({
    reducerPath: "api",
   baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({

        getUsers: builder.query<UserResponse, { limit: number; skip: number; filterKey?: string; filterValue?: string }>({
            query: ({ limit, skip, filterKey, filterValue }) => {
                let url = `/users?limit=${limit}&skip=${skip}`;
                if (filterKey && filterValue) {
                    url += `&${filterKey}=${filterValue}`;
                }
                return url;
            },
        }),

        addUsers: builder.mutation<UserData, Partial<UserData>>({
            query: (newUser) => ({
                url: "users/add",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"],
        }),

        updateUsers: builder.mutation<UserData, Partial<UserData> & { id: number }>({
            query: ({ id, ...updateUser }) => ({
                url: `users/${id}`, 
                method: "PUT",
                body: updateUser,
            }),
            invalidatesTags: ["Users"], 
        }),

        deleteUsers: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"], 
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddUsersMutation,
    useUpdateUsersMutation,
    useDeleteUsersMutation,
} = apiSlice;
