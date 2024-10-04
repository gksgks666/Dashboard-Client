import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "@/types/Module/Modal";
import { RootState } from "@/rtk";

const initialState: ModalState[] = [];

export const modalSelector = (state: RootState) => state.modal;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      const { type, props } = action.payload;
      return state.concat({ type, props }); // modal을 추가
    },
    closeModal: (state) => {
      state.pop(); //마지막 modal 제거
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
