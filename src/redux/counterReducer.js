import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    formData: null,
    userData: null,
    signUpModal: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSignUpModal: (state, action) => {
      state.signUpModal = action.payload;
    },
  },
});

export const { setFormData, setUserData, setSignUpModal } =
  counterSlice.actions;
export const counterStates = (state) => state.counter;
export default counterSlice.reducer;
