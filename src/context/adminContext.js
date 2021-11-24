import React, { useEffect,useState, useContext, useReducer } from 'react'
import reducer from '../reducer/adminReducer'
import axios from 'axios'
import {
  
  DASHBOARD_PRODUCTS_START,
  DASHBOARD_PRODUCTS_SUCCESS,
  DASHBOARD_PRODUCTS_ERROR,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  SET_PRODUCT,
  SUBMIT_START,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR,
  RESET_FORM_ERROR,
  RESET_FORM_SECCESS,
  EDIT_ITEM,
  SET_EDIT_PRODUCT,
  EDIT_SUBMIT_START,
  EDIT_SUBMIT_SUCCESS,
  EDIT_SUBMIT_ERROR,
  RESET_EDIT_FORM,
  RESET_EDIT_FORM_ERROR,
  GET_PAYMENTS_START,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_ERROR,
  SET_RECEIPT,
  FILTER_PAYMENT,
 ADMIN_OPEN_SIDEBAR,
 ADMIN_CLOSE_SIDEBAR,
 DELETE_PAYMENT_START,
 DELETE_PAYMENT_SUCCESS,
 DELETE_PAYMENT_ERROR,
 RESET_DELETE_PAYMENT,
 GET_USERS_START,
 GET_USERS_SUCCESS,
 GET_USERS_ERROR,
 GET_SINGLE_USER_START,
 GET_SINGLE_USER_SUCCESS,
 GET_SINGLE_USER_ERROR,
 FILTER_USERS,
} from '../actions'


const initialState = {
    loading:true,
    error:false,
    msg:'',
    all_products:{
        products:[],
        success:false,
    },
    delete_Product:{
        success:false,
    },
    productData:{
          name:'',
          brand:'',
          featured:false,
          category:'',
          color:'',
          file:'',
          image_id:'',
          classification:'',
          amount:'',
          price:'',
          desc:'',
  },

  submit_product:{
      loading:false,
      error:false,
      success:false,
      msg:''
  },

  edit:{
        loading:false,
        success:false,
        error:false,
        msg:'',
  },

  editedProduct:{
         _id:'',
          name:'',
          brand:'',
          featured:false,
          category:'',
          color:'',
          file:'',
          image_id:'',
          classification:'',
          amount:'',
          price:'',
          desc:'',
  },

  payments:{
    all_payments:[],
    filter_payment:[],
    count:0,
    success:false,
    loading:false,
    error:false,
    msg:'',
  },
  delete_payment:{
    loading:false,
    error:false,
    success:false,
    msg:'',
  },
  receipt:'',
  email:'',

  users:{
    all_users:[],
    filter_users:[],
    success:false,
    loading:'true',
    error:false,
    msg:'',
  },

  singleUser:{
    user:[],
    success:false,
    loading:false,
    error:false,
    msg:'',
  },

  isSidebarOpen:false,

}


const adminContext = React.createContext()

export const AdminProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)
    const [isNew, setIsNew] = useState(false);




    // admin sidebar
const openSidebar = ()=>{
  dispatch({type:ADMIN_OPEN_SIDEBAR})
}
const closeSidebar = ()=>{
  dispatch({type:ADMIN_CLOSE_SIDEBAR})
}
 

// fetch all products 
  const fetchProducts = async ()=>{
  dispatch({type:DASHBOARD_PRODUCTS_START})
  try {
    const response = await axios.get(`api/v1/products`);
    const products = response.data.products
    dispatch({type:DASHBOARD_PRODUCTS_SUCCESS, payload:products})
    
  } catch (error) {
    dispatch({type:DASHBOARD_PRODUCTS_ERROR})
  }
}
// fetch end 



// delete item start

const deleteProduct = async(id)=>{

    dispatch({type: DELETE_PRODUCT_START})

    try {
            await axios.delete(`api/v1/products/${id}`)
           fetchProducts()
        dispatch({type: DELETE_PRODUCT_SUCCESS})
    } catch (error) {
        console.log(error);
        dispatch({type: DELETE_PRODUCT_ERROR})
    }
}
// delete item end



// collect form data
const  addItem = async (e)=>{
  let name = e.target.name || e.target.dataset.id || e.target.type
  if(e.target.name){
    let value = e.target.value
     dispatch({type:SET_PRODUCT, payload:{ name, value }})

  } 
  else if(e.target.dataset.id){
    let value = e.target.checked
    dispatch({type:SET_PRODUCT, payload:{ name, value }})

  } 
  else{
    // *************select image and save to cloudinary
    const image = e.target.files[0]
    const imageData = new FormData()
    imageData.append('image', image)

    
    try {
    const {data:{image:{src, public_id}}} = await axios.post(`api/v1/products/uploads`,imageData)
    dispatch({type:SET_PRODUCT, payload:{value:{src, public_id} }})
  
  } catch (error) {
    console.log(error);
  }
  
}

}

// dynamic category selection
   const newCategory = (e)=>{
        const value = e.target.value
        if(value === 'new'){
            setIsNew(true)
        }
       else{
           setIsNew(false)
       }
    }

const handleSubmit = async (e)=>{
    e.preventDefault()
  dispatch({type:SUBMIT_START})
  let image;

// *********data from the product state
  const {
     name,
     brand,
     color,
     desc,
     price,
     featured,
     file, 
     image_id,
     classification,
     amount,
     category
        } = state.productData

 image=file
  
 const inStore = Number(amount)
 const mP = Number(price)
 

  try {
    // *********object to submit to the server
    const product = {
                name,
                brand,
                color,
                desc,
                price:mP,
                category,
                featured,
                inStore,
                classification,
                image,
                image_id
                   }
             await axios.post(`api/v1/products`, product)
                   fetchProducts()
        dispatch({type:SUBMIT_SUCCESS})
  } catch (error) {
    dispatch({type:SUBMIT_ERROR})
    console.log(error);
  
  }
}




// item to be edited
 const editItem = async (id)=>{
      const editItem= state.all_products.products.find((item)=>item._id === id)
        
        dispatch({type:EDIT_ITEM, payload:editItem})
    }

   


// collect edit data
const setEditValues = async (e)=>{
   let name = e.target.name || e.target.dataset.id || e.target.type
  if(e.target.name){
    let value = e.target.value
     dispatch({type:SET_EDIT_PRODUCT, payload:{ name, value }})

  } 
  else if(e.target.dataset.id){
    let value = e.target.checked
      dispatch({type:SET_EDIT_PRODUCT, payload:{ name, value }})

  } 
  else{
    const image = e.target.files[0]
   const imageData = new FormData()
   imageData.append('image', image)

    
  try {
    // *************upload image if changed
    const {data:{image:{src, public_id}}} = await axios.post(`api/v1/products/uploads`,imageData)
    dispatch({type:SET_EDIT_PRODUCT, payload:{value:{src, public_id} }})
  
  } catch (error) {
    console.log(error);
  }
  
      }
  }

const submitEdited = async (e)=>{
dispatch({type:EDIT_SUBMIT_START})
  e.preventDefault()
  let image;

// ************** data from editedProduct state
    const {
        _id,
     name,
     brand,
     color,
     desc,
     price,
     featured,
     file, 
     image_id,
     classification,
     amount,
     category
        } = state.editedProduct

 image=file
  
 const inStore = Number(amount)
 const mP = Number(price)
  
  try {
    
  const product = {
                name,
                brand,
                color,
                desc,
                price:mP,
                category,
                featured,
                inStore,
                classification,
                image,
                image_id
                   }

        
        await axios.patch(`api/v1/products/${_id}`, product)
        fetchProducts()
       dispatch({type:EDIT_SUBMIT_SUCCESS})
  } catch (error) {
    dispatch({type:EDIT_SUBMIT_ERROR})
  
  }
}


const getPayments = async()=>{
  dispatch({type:GET_PAYMENTS_START})

  try {
      const { data } = await axios.get(`api/v1/payments`)
      dispatch({type:GET_PAYMENTS_SUCCESS, payload:data})
      
  } catch (error) {
    dispatch({type:GET_PAYMENTS_ERROR})
  }
}


// delete payment
const delete_Payment = async(id)=>{

  dispatch({type: DELETE_PAYMENT_START})

  try {
    
    await axios.delete(`api/v1/payments/${id}`)
    getPayments()
    dispatch({type: DELETE_PAYMENT_SUCCESS})
  } catch (error) {
    dispatch({type:DELETE_PAYMENT_ERROR})
  }
}


// filter payment
const setTableFilters = (e)=>{
  const name = e.target.name
  const value = e.target.value
  dispatch({type:SET_RECEIPT, payload:{name, value}})
}


// reset delete payment error

const resetPaymentError = ()=>{

  dispatch({type:RESET_DELETE_PAYMENT})
}



// reset form on error
const resetForm = ()=> {
    dispatch({type:RESET_FORM_ERROR})
}

// reset form on success
const resetFormSuccess = ()=>{
    dispatch({type:RESET_FORM_SECCESS})
}

//reset edit form
const resetEditForm = ()=>{
    dispatch({type:RESET_EDIT_FORM})
}

const resetEditFormError = ()=>{
    dispatch({type:RESET_EDIT_FORM_ERROR})
}


// users

const getUsers = async()=>{
  dispatch({type:GET_USERS_START})

  try {
      const { data } = await axios.get(`api/v1/users`)

      dispatch({type: GET_USERS_SUCCESS, payload:data.users})
  } catch (error) {
    dispatch({type:GET_USERS_ERROR})
  }
}



// get single user

const  getSingleUser = async(id)=>{
  dispatch({type:GET_SINGLE_USER_START})

  
  
  try {

    dispatch({type:GET_SINGLE_USER_SUCCESS})
  } catch (error) {
    dispatch({type:GET_SINGLE_USER_ERROR})
    
  }
}


// useEffects

useEffect(()=>{
  dispatch({type:FILTER_PAYMENT})
  dispatch({type:FILTER_USERS})
},[state.receipt, state.email])

useEffect(() => {
    fetchProducts()
}, [])


  return (
    <adminContext.Provider value={{
        ...state,
        openSidebar,
        closeSidebar,
        deleteProduct,
        addItem,
        newCategory,
        isNew,
        handleSubmit,
        resetForm,
        resetFormSuccess,
        editItem,
        setEditValues,
        submitEdited,
        resetEditForm,
        resetEditFormError,
        setTableFilters,
        delete_Payment,
        resetPaymentError,
         getSingleUser,

        //  
      // paymnt page
        getPayments,
        // users pg
        getUsers

    }}>{children}</adminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(adminContext)
}
