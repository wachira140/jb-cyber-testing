
import {
    ADD_ITEM_TO_CART,
    DELETE_CART_ITEM,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    UPDATE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action)=>{

    if(action.type === ADD_ITEM_TO_CART){
        const item  = action.payload
        const {_id, image, price, name, inStore, classification } = item
        const tempItems = state.cart_Items.find((item)=>item._id ===_id)
        if(tempItems){
            const cartItem = state.cart_Items.map((item)=>{
                if(item._id === _id){
                    let newAmount = item.amount + 1
                    if(newAmount > item.inStore){
                        newAmount = item.inStore
                    }
                    return{
                        ...item,
                        amount:newAmount
                    }
                } else{
                    return item
                }
            }) 
            return{
                ...state,
                cart_Items:cartItem
            }
        } else{
            const newItem = {
                _id,
                image,
                name,
                price,
                amount:1,
                inStore,
                classification,
            }
            return {
                ...state,
                cart_Items:[...state.cart_Items, newItem]
            }
    }
}

if(action.type ===DELETE_CART_ITEM){
    const id = action.payload
    const cartItems = state.cart_Items.filter((item)=>item._id !== id)
    return {
        ...state,
        cart_Items:cartItems
    }
}

if(action.type === CLEAR_CART){
    return{
        ...state,
        cart_Items:[],
    }
}

if(action.type === UPDATE_CART_ITEM_AMOUNT){
    const { value, id } = action.payload
    // eslint-disable-next-line 
    const tempCart = state.cart_Items.map((item)=>{
        if(item._id === id){
            if(value === "inc"){
                let newAmount = item.amount +1
                if(newAmount > item.inStore){
                     newAmount = item.inStore
                }
                return {...item,amount:newAmount }
            }
            if(value === "dec"){
                let newAmount = item.amount -1
                if(newAmount < 1){
                    newAmount = 1
                }
                return {...item, amount:newAmount}
            }
            
        } else{
            return item
        }
    })

     return {
        ...state,
        cart_Items:tempCart,
    }
}

if(action.type === COUNT_CART_TOTALS){
    const total = state.cart_Items.reduce((total,items)=>{
        const { amount, price} = items
        total.total_items +=amount
        total.subtotal+=amount*price
        return total
    },{
       total_items:0, subtotal:0 
    })
    return{
        ...state,
        total_items:total.total_items,
        subtotal:total.subtotal
    }
}






throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
