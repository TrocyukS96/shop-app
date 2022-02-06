import {configureStore} from "@reduxjs/toolkit";
import {Cart} from "../features/cart/Cart";

export const store = configureStore({
reducer:Cart
})