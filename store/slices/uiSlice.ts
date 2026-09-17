import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UIState, UINotification } from "@/types";

const initialState: UIState = {
  theme: "light",
  notification: null,
  isModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    showNotification: (state, action: PayloadAction<UINotification>) => {
      state.notification = action.payload;
    },
    hideNotification: (state) => {
      state.notification = null;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  setTheme,
  showNotification,
  hideNotification,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
