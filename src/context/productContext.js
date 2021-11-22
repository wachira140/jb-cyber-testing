import React, { useEffect, useContext, useReducer, useState } from 'react'
import reducer from '../reducer/productReducer'
import axios from 'axios'
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


const initialState = {
  products:[],
  featured:[],
  branding:[],
  isSidebarOpen:false,
  isLoading:false,
  isError:false,
  singleProduct:{},
  singleProductLoading:false,
 singleProductError:false,

manage_All_Products:[],
category:[],

}

const url = "https://cyber-api-v1.herokuapp.com/api/v1"
// const url ="/api/v1"

const productContext = React.createContext()

export const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

const [openSubMenu, setOpenSubmenu ] = useState(false)
const [isLocation, setLocation ] = useState({})





  const openSidebar = ()=>{
    dispatch({type:OPEN_SIDEBAR})
  }
  const closeSidebar = ()=>{
    dispatch({type:ClOSE_SIDEBAR})
  }


const fetchMainProducts = async ()=>{
  dispatch({type:GET_PRODUCTS_BEGIN})
  try {
    const response = await axios.get(`${url}/products`);
    const products = response.data.products
    dispatch({type:GET_PRODUCTS, payload:products})
    
  } catch (error) {
    dispatch({type:GET_PRODUCTS_ERROR})
  }
}



const fetchSingleProducts = async (id)=>{
  dispatch({type:GET_SINGLE_PRODUCTS_BEGIN})
  try {
    const response = await axios.get(`${url}/products/${id}`);
     const product = response.data.product
    dispatch({type: GET_SINGLE_PRODUCT, payload:product})
    
  } catch (error) {
    dispatch({type:GET_SINGLE_PRODUCTS_ERROR})
  }
}





const clearSinglePrdError = ()=>{
  dispatch({type:CLEAR_SINGLE_PRODUCT_ERROR})
}











// const filterByCategory = (cat)=>{
//   const category = state.products.filter((item)=>item.category ===cat)
//   console.log(category);
//   dispatch({type:CATEGORY_PAGE, payload:category})
// }




const displaySubMenu = (e)=>{

  const tempBtn = e.target.getBoundingClientRect()
  const center = (tempBtn.left + tempBtn.right)/2
  const bottom = tempBtn.bottom - 3;
    setOpenSubmenu(true)
    setLocation({center, bottom})
}


const closeSubMenu = (e)=>{

  if(!e.target.classList.contains('menu-icon')){
    setOpenSubmenu(false)
  }
  
}


useEffect(()=>{
  fetchMainProducts()
},[])

 

  return (
    <productContext.Provider value={{
        ...state,
      openSidebar,
      closeSidebar,
      fetchSingleProducts,
      clearSinglePrdError,
       displaySubMenu,
       openSubMenu,
       closeSubMenu,
       isLocation,

    }}>{children}</productContext.Provider>
  )
}

export const useProductContext = () => {
  return useContext(productContext)
}
