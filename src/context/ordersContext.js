import React, {useContext, useEffect, useReducer} from 'react'
import reducer from '../reducer/ordersReducer.js'
import { useCartContext } from './cartContext.js'
import { useAuthContext } from './authContext.js'
import { deliverMethod } from '../locations'
import axios from 'axios'
import {
   LOAD_CART_ITEMS,
   GET_DESTINATION_COSTS,
   SET_DELIVERY_LOCATION,
   LOAD_LOCATIONS,
   DELIVERY_DETAILS,
   CALCULATE_TRANSPORT_COST,
   SUBMIT_ORDER_START,
   SUBMIT_ORDER_SUCCESS,
   SUBMIT_ORDER_ERROR,
   CURRENT_ORDERS_START,
   CURRENT_ORDERS_SUCCESS,
   CURRENT_ORDERS_ERROR,
   PAY_CURRENT_ORDER,
   RESET_MPESA_PAY,
   SINGLE_ORDER_START,
   SINGLE_ORDER_SUCCESS,
   SINGLE_ORDER_ERROR,
   DELETE_ORDER_START,
   DELETE_ORDER_SUCCESS,
   DELETE_ORDER_ERROR,
   PAY_MPESA_START,
   PAY_MPESA_SUCCESS,
   PAY_MPESA_ERROR,
   SET_PAYMENT_NUMBER,
   CLEAR_MPESA_ERROR,
   GET_ALL_ORDERS,
   GET_ALL_ORDERS_SUCCESS,
   GET_ALL_ORDERS_ERROR,
   CLEAR_SINGLE_ORDER_ERROR,
   CLEAR_DELETE_ORDER_ERROR,

}from '../actions'


const getLocalStorage = ()=>{
        let items = localStorage.getItem('order')
    
        if(items){
                return JSON.parse(localStorage.getItem('order'))
            }
            return ''
        }


const initialState = {
    cartItems:[],
    all_locations:[],
    delivery_services:[],
    collect_user_details:{
            location:'',
            courier_service:'',
            pick_station:'',
            phone:null,
        },
        transport_cost:0,
    destination_transport_cost:[],

    order_loading:false,
    success:false,
    order_error:false,
    order_Id:getLocalStorage(),
    all_current_orders_loading:false,
    all_current_orders:[],
    all_current_orders_errors:false,

    single_order_load:false,
    single_order:[],
    single_order_error:false,

    mobileNumber:'',
    mpesa:{
        load:false,
        success:false,
        error:false,
        msg:''
    },

    get_All_Orders:{
        orders:[],
        loading:false,
        error:false,
        success:false,
        amount:0,
        msg:'',
    },
    delete_Order:{
        loading:false,
        error:false,
        msg:''
    }

}

const ordersContext = React.createContext()

// const url = "https://cyber-api-v1.herokuapp.com/api/v1"
// const url = "/api/v1"

 export const OrdersProvider = ({children}) => {
    const [state, dispatch ] = useReducer(reducer, initialState)

    const { user } = useAuthContext()
    const { cart_Items, subtotal, total_items }  = useCartContext()


   const chooseLocation = (e)=>{
        const value = e.target.value
        dispatch({ type:SET_DELIVERY_LOCATION, payload: value})
    }

    const deliveryDetails = (e)=>{
        let name = e.target.name
            let value = e.target.value
            dispatch({type:DELIVERY_DETAILS, payload: {name, value}})
        }

// calculate transportation cost


const transportCost = ()=>{
    dispatch({type:GET_DESTINATION_COSTS})
}

const submitOrder = async()=>{
    dispatch({type:SUBMIT_ORDER_START})
    
    const { collect_user_details, transport_cost:transport, cartItems } = state
    const { location, courier_service:courier, pick_station:pick_up ,phone } = collect_user_details
    
    

    const items = cartItems.map((item)=>{
        const product = item._id
        const amount = item.amount
        return { product, amount}
    })

            const contact = Number(phone)
            
            const orderDetails = {
                transport,
                cartItems:items,
                location,
                courier,
                pick_up,
                contact
            };
            
            try {
                const response = await axios.post(`api/v1/orders`, orderDetails)
                const{ _id } = response.data.order
                currentOrders()
                dispatch({type:SUBMIT_ORDER_SUCCESS, payload:_id})
            } catch (error) {
                dispatch({type:SUBMIT_ORDER_ERROR})
            }
        }




// get all orders
    const getOrders = async() =>{
        dispatch({type:GET_ALL_ORDERS})

        try {
                const response = await axios.get(`api/v1/orders`)
                const { data }= response
                dispatch({type:GET_ALL_ORDERS_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type:GET_ALL_ORDERS_ERROR})
        }
    }



    // users current orders

const currentOrders = async()=>{
    dispatch({type:CURRENT_ORDERS_START})
    try {
        const response = await axios.get(`api/v1/orders/showUsersOrders`)
        
        const {orders} = response.data
            dispatch({type:CURRENT_ORDERS_SUCCESS,payload:orders})
        } catch (error) {
            
            dispatch({type:CURRENT_ORDERS_ERROR})
        }
    }



    // pay from current unpaid orders page

    const payOrder = (id)=>{
        dispatch({type: PAY_CURRENT_ORDER, payload: id})
    }


    
    const viewSingleOrder = async(id)=>{
        dispatch({type:SINGLE_ORDER_START})
        
        try {
            const response = await axios.get(`https://cyber-api-v1.herokuapp.com/api/v1/orders/${id}`)
            const { order } = response.data
            dispatch({type:SINGLE_ORDER_SUCCESS, payload: order})
        } catch (error) {
            dispatch({type:SINGLE_ORDER_ERROR})
        }
    }
    
    const deleteOrder = async(id)=>{
        dispatch({type:DELETE_ORDER_START})
        
        try {
            await axios.delete(`api/v1/orders/${id}`)
            currentOrders()
            getOrders()
            dispatch({type:DELETE_ORDER_SUCCESS})
        } catch (error) {
            
            dispatch({type:DELETE_ORDER_ERROR})
        }
        
    }
    
    
    
    

    
    
    const getNumber = (e)=>{
        const phoneNumber = e.target.value
        dispatch({type:SET_PAYMENT_NUMBER, payload:phoneNumber})
    }
    
    
    
    const payWithMpesa = async()=>{
        dispatch({type:PAY_MPESA_START})
        
        const { order_Id:orderId, mobileNumber} = state
        
        
        const phoneNumber= Number(`254${mobileNumber}`)
        
        try {
            
            await axios.post(`api/v1/mpesa/lipaNaMpesa`, {phoneNumber, orderId})
            dispatch({type:PAY_MPESA_SUCCESS})
        } catch (error) {
            dispatch({type:PAY_MPESA_ERROR})
        }
        
    }





    // clear mpesa pay success/ reset mpesa success and order success

    const clearPay = ()=>{
        dispatch({type:RESET_MPESA_PAY})

    }
    
    
 const resetDeleteOrder = ()=>{
     dispatch({ type:CLEAR_DELETE_ORDER_ERROR})
 }
    
    const clearErrorSingleOrder = ()=>{
    dispatch({ type:CLEAR_SINGLE_ORDER_ERROR})
}



const clearMpesaError=()=>{
    dispatch({type:CLEAR_MPESA_ERROR})
}


// useEffects

useEffect(() => {
    transportCost()
}, [state.collect_user_details, cart_Items])


useEffect(() => {
    dispatch({type:CALCULATE_TRANSPORT_COST})
}, [state.collect_user_details.courier_service,state.cartItems ])



useEffect(() => {
     localStorage.setItem('order',JSON.stringify(state.order_Id))
     // eslint-disable-next-line 
}, [state.success])


    useEffect(() => {
        dispatch({type:LOAD_CART_ITEMS, payload: cart_Items})
        dispatch({type:LOAD_LOCATIONS ,payload: deliverMethod})
    }, [cart_Items])







   return (
    <ordersContext.Provider value={{
        ...state,
             user,
             subtotal,
             total_items,
             chooseLocation ,
             deliveryDetails,
             submitOrder,
             viewSingleOrder,
             deleteOrder,
             payWithMpesa,
             getNumber,
             clearMpesaError,
             clearErrorSingleOrder,
             resetDeleteOrder,
             payOrder,
             clearPay,

            //  
            getOrders,
            // orders and payments
            currentOrders,

            }}>
{children}</ordersContext.Provider>
   )
}

export const useOrdersContext = ()=>{
    return useContext(ordersContext)
}


        
        