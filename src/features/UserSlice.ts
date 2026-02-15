import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserData = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  gender?: string;
  birthDate?: string;
  image?: string;
  password?:string;
};

type UserState = {
  users: UserData[];
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<UserData>) => {
      state.users = [action.payload, ...state.users];
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      } else {
        state.users.unshift(action.payload);
      }
    },
  },
  selectors: {
    getUsers: (state: UserState) => state.users,
  },
});


export const { setUsers, addUser, deleteUser, updateUser } = userSlice.actions;
export const { getUsers } = userSlice.selectors
export default userSlice.reducer;
