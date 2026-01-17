import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[]
};

export const cartSlise = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state , action) => {
            state.cart.push({ ...action.payload , qty:1 })
        },
        removeToCart: (state , action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id);
        },
        increase: (state  , action) =>{
            state.cart = state.cart.map((el) => {
                if(el.id === action.payload.id ){
                    return{...el , qty:el.qty + 1}
                }else{
                    return el
                }
            })
        },

        decrease: (state , action) => {
            let item = state.cart.find((el) => el.id === action.payload.id);
            if(item.qty > 1){
                state.cart = state.cart.map((el) => {
                    if (el.id === action.payload.id) {
                        return { ...el, qty: el.qty - 1 }
                    } else {
                        return el
                    }
                })

            }else{
                state.cart = state.cart.filter((el) => el.id !== action.payload.id)
            }
        }, 

        removeProduct: (state , action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id)
        }
    }
})


export const {addToCart , removeToCart , increase , decrease , removeProduct } = cartSlise.actions;
export default cartSlise.reducer;