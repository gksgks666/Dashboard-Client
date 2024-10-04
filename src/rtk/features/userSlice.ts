import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { PURGE } from "redux-persist";

interface UserState {
  userId: string;
  role: string;
}

const initialState: UserState = {
  userId: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.userId = initialState.userId;
      state.role = initialState.role;
    },
  },
  /* extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }, */
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
