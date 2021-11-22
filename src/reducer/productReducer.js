import {
OPEN_SIDEBAR,
ClOSE_SIDEBAR,
GET_PRODUCTS_BEGIN,
GET_PRODUCTS_ERROR,
GET_PRODUCTS,
GET_SINGLE_PRODUCT,
GET_SINGLE_PRODUCTS_BEGIN,
GET_SINGLE_PRODUCTS_ERROR,
CLEAR_SINGLE_PRODUCT_ERROR,

} from '../actions'

const reducer = (state, action) => {

if(action.type === OPEN_SIDEBAR){
    return {
        ...state,
        isSidebarOpen:true,
    }
}
if(action.type === ClOSE_SIDEBAR){
    return{
        ...state,
        isSidebarOpen:false,
    }
}

if(action.type === GET_PRODUCTS_BEGIN){
    return {
        ...state,
        isLoading:true

    }
}

if(action.type === GET_PRODUCTS){
    
    const featured = action.payload.filter((item)=>item.featured === true)
    const branding = action.payload.filter((item)=>item.brand === 'branding')
    return {
        ...state,
        products:action.payload,
        isLoading:false,
        featured,
        branding,
    }
}

if(action.type === GET_PRODUCTS_ERROR){
    return {
        ...state,
        isLoading:false,
        isError:true,
        
    }

}
if(action.type === GET_SINGLE_PRODUCTS_BEGIN){
    return {
        ...state,
        singleProductLoading:true,
    }
}


if(action.type === GET_SINGLE_PRODUCT){
    return {
        ...state,
         singleProduct:action.payload,
        singleProductLoading:false
    }
}

if(action.type === GET_SINGLE_PRODUCTS_ERROR){
    return {
        ...state,
        singleProductLoading:false,
         singleProductError:true,
    }
}


if(action.type === CLEAR_SINGLE_PRODUCT_ERROR){
    return{
        ...state,
        singleProductError:false,
    }
}


   




    throw new Error(`No Matching "${action.type}" - action type`)
}

export default reducer
