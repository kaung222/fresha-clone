import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { email: string } = {
  email: "",
};

export const emailSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    storeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeEmail } = emailSlice.actions;

export default emailSlice.reducer;
