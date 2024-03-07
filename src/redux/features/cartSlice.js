import {createSlice} from "@reduxjs/toolkit"

const initialState={
    cart:[]
}

const cartSlice = createSlice({
    name:"cartslice",
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            
            let indexId = state.cart.findIndex((item)=>{
                return(
                    item.id===action.payload.id
                    )
                })       
                if(indexId>=0){
                    state.cart[indexId].qnty+=1
                }else{
                let temp ={...action.payload, qnty:1 }
                    state.cart=[...state.cart, temp]
                }
        },
        removeCart:(state, action)=>{
            
            let remainData=state.cart.find((item)=>item.id===action.payload)            
            state.cart.splice(remainData,1)
            // OR
            // let remainData=state.cart.filter((item)=>item.id!==action.payload)
            // state.cart=remainData
        },

        //cart Increment
        cartDecrement:(state,action)=>{
            let cartIndex=state.cart.findIndex((item)=>item.id===action.payload.id)
            if(state.cart[cartIndex].qnty>=1){
                state.cart[cartIndex].qnty-=1
            }
        },

        //clear Cart

        clearCart:(state, action)=>{
            state.cart=[]
        }
    }
});

export const {addToCart , removeCart, cartDecrement, clearCart}=cartSlice.actions;
export default cartSlice.reducer