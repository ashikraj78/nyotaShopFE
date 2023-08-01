import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    formData: null,
    userData: null,
    signUpModal: null,
    thankModal: false,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setThankModal: (state, action) => {
      state.thankModal = action.payload;
    },
    setSignUpModal: (state, action) => {
      state.signUpModal = action.payload;
    },
    logoutUser: (state) => state.initialState,
  },
});

export const {
  setFormData,
  setUserData,
  setThankModal,
  setSignUpModal,
  logoutUser,
} = counterSlice.actions;
export const counterStates = (state) => state.counter;
export default counterSlice.reducer;
