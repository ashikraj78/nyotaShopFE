import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
