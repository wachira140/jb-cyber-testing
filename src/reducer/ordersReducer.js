import {
LOAD_CART_ITEMS,
SET_DELIVERY_LOCATION,
LOAD_LOCATIONS,
DELIVERY_DETAILS,
GET_DESTINATION_COSTS,
CALCULATE_TRANSPORT_COST,
SUBMIT_ORDER_START,
SUBMIT_ORDER_SUCCESS,
SUBMIT_ORDER_ERROR,
CURRENT_ORDERS_START,
CURRENT_ORDERS_SUCCESS,
CURRENT_ORDERS_ERROR,
PAY_CURRENT_ORDER,
SINGLE_ORDER_START,
SINGLE_ORDER_SUCCESS,
SINGLE_ORDER_ERROR,
DELETE_ORDER_START,
DELETE_ORDER_SUCCESS,
DELETE_ORDER_ERROR,
SET_PAYMENT_NUMBER,
PAY_MPESA_START,
PAY_MPESA_SUCCESS,
RESET_MPESA_PAY,
PAY_MPESA_ERROR,
CLEAR_MPESA_ERROR,
GET_ALL_ORDERS,
GET_ALL_ORDERS_SUCCESS,
GET_ALL_ORDERS_ERROR,
CLEAR_SINGLE_ORDER_ERROR,
CLEAR_DELETE_ORDER_ERROR,
} from '../actions'

 const orders_reducer = (state, action)=>{

    if(action.type === LOAD_CART_ITEMS){
        return {
            ...state,
            cartItems:action.payload,
        }
    }



// all locations available
    if(action.type === LOAD_LOCATIONS){
        return {
            ...state,
            all_locations:{...action.payload}
        }
    }



    if(action.type === SET_DELIVERY_LOCATION){
        const value = action.payload
        const tempLoc = state.all_locations[value]

    
        if(value === 'choose location'){
            return{
                ...state,
                delivery_services:[],
                transport_cost:0,
                collect_user_details:{
                    ...state.collect_user_details,
                              location:'',
                              courier_service:'',
                              pick_station:'',
                    },
            }
        }
        return{
            ...state,
            delivery_services:tempLoc,
            transport_cost:0,
            collect_user_details:{
                ...state.collect_user_details,
                          location:value,
                          courier_service:'',
                          pick_station:'',
                },
        }
    }



    // pickup / delivery method / phone number

    if(action.type === DELIVERY_DETAILS){
        const { name, value } = action.payload


        if(name ==='courier_service' ){
            return {
                ...state,
                 collect_user_details:{
                    ...state.collect_user_details,
                        pick_station:'',
                         [name]:value,
                }
            }
        }
            if(value === 'choose pick up'){
                return {
                ...state,
                transport_cost:0,   
                collect_user_details:{
                    ...state.collect_user_details,
                         pick_station:'',
                }
            }
            }

        return{
            ...state,
               collect_user_details:{
                    ...state.collect_user_details,
                         [name]:value,
                }
        }
    }


    // get the list of cost for all destinations

    if(action.type === GET_DESTINATION_COSTS){

        const { delivery_services, collect_user_details } = state
        const { courier_service } = collect_user_details

            if(!collect_user_details.location || !courier_service){

                return {
                    ...state,
                }
            }

        const locations = delivery_services.filter((town)=>town.name ===courier_service)
            const destiny_cost = locations.map((destiny)=>destiny.cost).flat()
            
        return{
            ...state,
            destination_transport_cost:[...destiny_cost]
        }
    }


    // calculate the costs of transport for all products.

    if(action.type === CALCULATE_TRANSPORT_COST){
        const { cartItems, destination_transport_cost, collect_user_details} = state

        if(!collect_user_details.courier_service){
            return {
                ...state,
                transport_cost:0,
            }
        }

            const trans_cost = destination_transport_cost.map((p)=>{
               
                
                const itemClass = cartItems.filter((c)=>c.classification ===p.classification)
                const item_total_transport = itemClass.map((item)=>item.amount *p.price);
                return item_total_transport
            })
            const transportArray = trans_cost.flat()
            

            if(transportArray.length < 1){
                return {
                    ...state
                }
            }
            
            const transport_cost = transportArray.reduce((acc, value)=>acc + value)
           
            return {
                ...state, 
                transport_cost:transport_cost ,
                collect_user_details:{
                    ...state.collect_user_details,
                }
            }
    
    }


    // ****************************ORDER SUBMIT***************************
if(action.type ===SUBMIT_ORDER_START){
    return{
        ...state,
        order_loading:true,
    }
}
if(action.type ===SUBMIT_ORDER_SUCCESS){
    return{
        ...state,
        order_loading:false,
        success:true,
        order_Id:action.payload,
    }
}



if(action.type ===SUBMIT_ORDER_ERROR){
    return{
        ...state,
        order_loading:false,
        order_error:true,
    }
}

// all orders

if(action.type === GET_ALL_ORDERS){
    return{
        ...state,
         get_All_Orders:{
             ...state.get_All_Orders,
             loading:true,
             msg:'loading orders'
         }
    }
}

if(action.type === GET_ALL_ORDERS_SUCCESS){
    const { orders, count } = action.payload
    return{
        ...state,
         get_All_Orders:{
             ...state.get_All_Orders,
             orders,
             amount:count,
             loading:false,
             success:true,
             msg:'orders loaded successfully'
         }
    }
}

if(action.type === GET_ALL_ORDERS_ERROR){
    return {
        ...state,
        get_All_Orders:{
            ...state.get_All_Orders,
            loading:false,
            error:true,
            msg:'error occured. try again'
        }
    }
}





// load orders from db

if(action.type === CURRENT_ORDERS_START){
    return {
        ...state,
        all_current_orders_loading:true,
    }
}
if(action.type === CURRENT_ORDERS_SUCCESS){
    return {
        ...state,
        all_current_orders_loading:false,
        all_current_orders:action.payload
    }
}
if(action.type === CURRENT_ORDERS_ERROR){
    return {
        ...state,
        all_current_orders_errors:true,
        all_current_orders_loading:false  
    }
}


// pay for current unpaid orders on page

if(action.type === PAY_CURRENT_ORDER){
    return {
        ...state,
        success:true,
        order_Id: action.payload
    }
}



// single order
if(action.type === SINGLE_ORDER_START){
    return{
        ...state,
        single_order_load:true,
    }
}
if(action.type === SINGLE_ORDER_SUCCESS){
    return{
        ...state,
        single_order_load:false,
        single_order:action.payload,
    }
}


if(action.type === SINGLE_ORDER_ERROR){
    return{
        ...state,
        single_order_load:false,
        single_order_error:true,
    }
}

// clear single order error on timeout
if(action.type === CLEAR_SINGLE_ORDER_ERROR){
    return{
        ...state,
        single_order_error:false,
    }
}

// delete order

if(action.type ===DELETE_ORDER_START){
    return{
        ...state,
        delete_Order:{
            ...state.delete_Order,
            loading:true,
            msg:'deleting order',
        }
    }
}
if(action.type ===DELETE_ORDER_SUCCESS){
    return{
        ...state,
         delete_Order:{
            ...state.delete_Order,
            loading:false,
            msg:'order deleted',
        }
    }
}
if(action.type ===DELETE_ORDER_ERROR){
    return{
        ...state,
        delete_Order:{
            ...state.delete_Order,
            loading:false,
            error:true,
            msg:'order not deleleted',
        }
    }
}

if(action.type === CLEAR_DELETE_ORDER_ERROR){
     return{
        ...state,
        delete_Order:{
            loading:false,
            error:false,
            msg:'',
        }
    }
}

// pay with mpesa

if(action.type === SET_PAYMENT_NUMBER){
    return{
        ...state,
        mobileNumber:action.payload
    }
}

if(action.type === PAY_MPESA_START){
    return{
        ...state,
        mpesa:{
            ...state.mpesa,
            load:true,
        }
    }
}
if(action.type === PAY_MPESA_SUCCESS){
    return{
        ...state,
        mpesa:{
            ...state.mpesa,
            load:false,
            success:true,
            msg:'success. check your mobile'
        }
    }
}
if(action.type === PAY_MPESA_ERROR){
    return{
        ...state,
        mpesa:{
            ...state.mpesa,
            load:false,
            error:true,
            msg:'error occurred. please try again'
        }
    }
}

if(action.type === RESET_MPESA_PAY){
     return{
        ...state,
       success:false,
        mpesa:{
            ...state.mpesa,
            load:false,
            success:false,
            error:false,
            msg:''
        }
    }
   
}


// currently not used
if(action.type === CLEAR_MPESA_ERROR){
    return{
        ...state,
        success:false,
        mpesa:{
            ...state.mpesa,
            error:false,
            msg:''
        }
    }
}




throw new Error(`No Matching "${action.type}" - action type`)
}

export default orders_reducer