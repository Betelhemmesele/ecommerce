"use client";
import { Provider } from "react-redux";
import { store } from "./ConfigureStore";
// import { persistStore } from "redux-persist";

// persistStore(store); // persist the store

export default function ReduxProvider({
  children,
}){
  return <Provider store={store}>{children}</Provider>;
}
