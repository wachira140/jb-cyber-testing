import React, { useContext,useReducer, useEffect } from 'react'
import reducer from '../reducer/cartReducer'
import {
    ADD_ITEM_TO_CART,
    DELETE_CART_ITEM,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    UPDATE_CART_ITEM_AMOUNT
} from '../actions'


const getItemsInLocalStorage = ()=>{
    let items = localStorage.getItem('cart')

    if(items){
        return JSON.parse(localStorage.getItem('cart'))
    }
    return []
}


const initialState = {
    cart_Items:getItemsInLocalStorage(),
    total_items:0,
    subtotal:0,
}


const cartContext = React.createContext()


export const CartProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

 


    const addToCart = (item)=>{
       dispatch({type:ADD_ITEM_TO_CART, payload:item})
    }

    const deleteItem = (id)=>{
        dispatch({type:DELETE_CART_ITEM, payload:id})
    }

    const clearCart = ()=>{
        dispatch({type:CLEAR_CART})
    }


    const toggleCartAmount = (id, value)=>{
        dispatch({type:UPDATE_CART_ITEM_AMOUNT, payload:{ value, id}})
    }

    useEffect(()=>{
        dispatch({type:COUNT_CART_TOTALS})
        localStorage.setItem('cart',JSON.stringify(state.cart_Items))
    },[state.cart_Items])

    return (
        <cartContext.Provider value={{
            ...state,
            addToCart,
            deleteItem,
            clearCart,
            toggleCartAmount,

        }}>
            {children}
        </cartContext.Provider>
    )
   
}

export const useCartContext = ()=>{
    return useContext(cartContext)
}
