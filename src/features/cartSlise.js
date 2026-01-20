import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]")
};

export const cartSlise = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state , action) => {
            state.cart.push({ ...action.payload , qty:1 })
            localStorage.setItem("cart" , JSON.stringify(state.cart))
        },
        removeToCart: (state , action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        increase: (state  , action) =>{
            state.cart = state.cart.map((el) => {
                if(el.id === action.payload.id ){
                    return{...el , qty:el.qty + 1}
                }else{
                    return el
                }
            })
            localStorage.setItem("cart", JSON.stringify(state.cart))
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
                localStorage.setItem("cart", JSON.stringify(state.cart))

            }else{
                state.cart = state.cart.filter((el) => el.id !== action.payload.id)
                localStorage.setItem("cart", JSON.stringify(state.cart))
            }
        }, 

        removeProduct: (state , action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id)
            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
    }
})


export const {addToCart , removeToCart , increase , decrease , removeProduct } = cartSlise.actions;
export default cartSlise.reducer;