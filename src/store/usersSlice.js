import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (users, action) => {
      users.currentUser = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

const selectUsers = (state) => state.users;

export default usersSlice.reducer;

export const useUsers = () => {
  const users = useSelector(selectUsers);
  return users;
};
