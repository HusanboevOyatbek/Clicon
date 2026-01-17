import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlise"
export const cartStore = configureStore({
    reducer:cartReducer
})