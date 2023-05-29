import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import clientReducer from "./clientSlice";

export const store = configureStore({
    reducer:{
        user: userReducer,
        productos:productReducer,
        clientes:clientReducer,
    },

});