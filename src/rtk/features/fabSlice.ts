import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "@/types/Module/Modal";
import { RootState } from "@/rtk";

const initialState: ModalState[] = [];

export const fabSelector = (state: RootState) => state.fab;

export const fabSlice = createSlice({
  name: "fab",
  initialState,
  reducers: {
    openFab: (state, action: PayloadAction<ModalState>) => {
      const { type, props } = action.payload;
      return state.concat({ type, props }); // modal을 추가
    },
    closeFab: (state, action: PayloadAction<ModalState>) => {
      const { type } = action.payload;
      return state.filter((fab) => fab.type !== type); //특정 type 제거
    },
  },
});

export const { openFab, closeFab } = fabSlice.actions;

export default fabSlice.reducer;
