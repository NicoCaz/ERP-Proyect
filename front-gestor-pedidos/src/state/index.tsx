import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode: "light",
    user:null,
    token: null,
    products:[],
    clients:[], 
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode: (state)=>{
            state.mode= state.mode== "light"? "dark": "light";
        },
        setLogin: (state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
        },
        setProduct:(state,action)=>{
            state.products=action.payload.products;
        },
        setClients:(state,action)=>{
            state.clients=action.payload.clients;
        },
        updateClient:(state,action)=>{
            const actClients= state.clients.map((client)=>{
                if (client._id ===action.payload.client._id) return action.payload.client
                return client;
            });
            state.clients= actClients;
        },
        updateProduct:(state,action)=>{
            const actProducts =state.products.map((product)=>{
                if (product._id == action.payload.product._id) return action.payload.product
                return product
            });
            state.products= actProducts
        }
    }
})


export const {setMode, setLogin,setLogout,setProduct,setClients,updateClient, updateProduct} = authSlice.actions;
export default authSlice.reducer;