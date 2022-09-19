import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
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
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

function saveToLocalStorage(state) {//will monitor local storage and update the state every time its called
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persist:root", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}


const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
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

store.subscribe(() => saveToLocalStorage(store.getState())); //called automatically whenever a dispatch function is executed, then will call saveToLocalStoarge!

export let persistor = persistStore(store);
