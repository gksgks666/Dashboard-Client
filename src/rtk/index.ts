import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
import globalReducer from "@/rtk/features/globalSlice";
import userReducer from "@/rtk/features/userSlice";
import modalReducer from "@/rtk/features/modalSlice";
import fabReducer from "@/rtk/features/fabSlice";
//import { setupListeners } from "@reduxjs/toolkit/query"; //rtk query 사용시 필요
//import { api } from "@/rtk/api.js";  // RTK-query API호출

const persistConfig = {
  key: "root",
  storage, //local storage에 저장
  whitelist: ["user"], //user Reducer만 저장
};

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  modal: modalReducer,
  fab: fabReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

/* const store = configureStore({
  reducer: {
    global: globalReducer,
    //auth: userReducer,
    //[api.reducerPath]: api.reducer,
  },
  //middleware: (getDefault) => getDefault().concat(api.middleware),
});
//setupListeners(store.dispatch); //react-query 사용으로 불필요

export default store; */
