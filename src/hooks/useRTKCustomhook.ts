import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/rtk";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTypedDispatch: () => AppDispatch = useDispatch;
