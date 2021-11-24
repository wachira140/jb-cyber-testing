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
SET_EDIT_PRODUCT,
EDIT_SUBMIT_START,
EDIT_SUBMIT_SUCCESS,
EDIT_SUBMIT_ERROR,
EDIT_ITEM,
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

 const adminReducer = (state, action)=>{



    if(action.type === ADMIN_OPEN_SIDEBAR){
        return{
            ...state,
            isSidebarOpen:true,
        }
    }
    if(action.type === ADMIN_CLOSE_SIDEBAR){
        return{
            ...state,
            isSidebarOpen:false,
        }
    }

    // load all items

    if(action.type === DASHBOARD_PRODUCTS_START){
        return{
            ...state,
            loading:true,
        }
    }


    if(action.type === DASHBOARD_PRODUCTS_SUCCESS){
        return{
            ...state,
            loading:false,
            all_products:{
                ...state.all_products,
                products:action.payload,
                success:true,
            }
        }
    }

    if(action.type === DASHBOARD_PRODUCTS_ERROR){
        return{
            ...state,
            loading:false,
            error:true,
            msg:'error occured when loading products. try again'
        }
    }


// delete item

if(action.type === DELETE_PRODUCT_START){
    return{
        ...state,
        loading:true,
    }
}

if(action.type === DELETE_PRODUCT_SUCCESS){
    return{
        ...state,
        loading:false,
        delete:{
            success:true,
        }
    }
}
if(action.type === DELETE_PRODUCT_ERROR){
    return{
        ...state,
        loading:false,
        error:true,
        msg:'item not deleted. try again',
    }
}



// add item
if(action.type === SET_PRODUCT){
    const { name, value } = action.payload

    if( value === 'class' ){
        return {
            ...state,
            productData:{
                ...state.productData,
                    classification:'',
            }
        }
    }
    if( value === 'category' ){
        return {
            ...state,
            productData:{
                ...state.productData,
                    category:'',
            }
        }
    }

   if(!name){
       return {
           ...state,
                productData:{
                    ...state.productData,
                    file:value.src,
                    image_id:value.public_id,
                }
       }
       
   }else{
            return {
       ...state,
            productData:{
                ...state.productData,
                [name]:value,
                
            }
        
   }
   }

}



// submit product to db

if(action.type === SUBMIT_START){
    return{
        ...state,
        submit_product:{
            ...state.submit_product,
            loading:true,
        }
    }
}

if(action.type === SUBMIT_SUCCESS){
    return{
        ...state,
        submit_product:{
            ...state.submit_product,
            loading:false,
            success:true,
            msg:'product submited successfully'
        }
    }
}

if(action.type === SUBMIT_ERROR){
    return{
        ...state,
        submit_product:{
            ...state.submit_product,
            loading:false,
            msg:'failed to submit',
            error:true,
        }
    }
}

// reset form error
if(action.type === RESET_FORM_ERROR){
    return{
        ...state,
        submit_product:{
            ...state.submit_product,
            error:false,
            msg:''
        }
    }
}

// reset form success
if(action.type === RESET_FORM_SECCESS){
    return{
        ...state,
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
            ...state.submit_product,
            success:false,
            msg:'',
        }
    }
}


// item to be edited
if(action.type === EDIT_ITEM){
    console.log(action.payload);
   const { _id, name, brand, category, color,inStore,classification, featured,desc, image, image_id, price} = {...action.payload}
    return {
        ...state,
        editFlag:true,
    editedProduct:{
         _id,
          name,
          brand,
          featured,
          category,
          color,
          file:image,
          image_id,
          classification,
          amount:inStore,
          price,
          desc,
  }
    }
}






// set edit data to form
if(action.type === SET_EDIT_PRODUCT){
      const { name, value } = action.payload

    if( value === 'class' ){
        return {
            ...state,
            productData:{
                ...state.productData,
                    classification:'',
            }
        }
    }
    if( value === 'category' ){
        return {
            ...state,
            productData:{
                ...state.productData,
                    category:'',
            }
        }
    }
   if(!name){
       return {
           ...state,
                editedProduct:{
                    ...state.editedProduct,
                    file:value.src,
                    image_id:value.public_id,
                }
       }
       
   } else{
            return {
       ...state,
            editedProduct:{
                ...state.editedProduct,
                [name]:value,
                
            }
        
   }
   }
}

 if(action.type === EDIT_SUBMIT_START){
     return{
         ...state,
         edit:{
             ...state.edit,
             loading:true,
         }
     }
 }

if(action.type === EDIT_SUBMIT_SUCCESS){
    return{
        ...state,
        edit:{
            ...state.edit,
            loading:false,
            success:true,
            msg:'editing successfull. redirecting to store.'
        }
    }
}

if(action.type === EDIT_SUBMIT_ERROR){
    return{
        ...state,
        edit:{
            ...state.edit,
            loading:false,
            error:true,
            msg:'editing not successfull. check all fields.'
        }
    }
}

// reset edit form
if(action.type === RESET_EDIT_FORM){
    return{
        ...state,
        edit:{
            ...state.edit,
            success:false,
            msg:''
        }
    }
}
if(action.type === RESET_EDIT_FORM_ERROR){
    return{
        ...state,
        edit:{
            ...state.edit,
            error:false,
            msg:''
        }
    }
}


// payments

if(action.type === GET_PAYMENTS_START){
    return{
        ...state,
        payments:{
            ...state.payments,
            loading:true,
        }
    }
}

if(action.type === GET_PAYMENTS_SUCCESS){
    const { count, payments} = action.payload
    return {
        ...state,
        payments:{
            ...state.payments,
            loading:false,
            success:true,
            msg:'payments loaded successfully',
            all_payments:payments,
            filter_payment:payments,
            count,
        }
    }
}

if(action.type === GET_PAYMENTS_ERROR){
    return{
        ...state,
        payments:{
            ...state.payments,
            loading:false,
            error:true,
            msg:'error occurred. try again.'
        }
    }
}


// filter payment


if(action.type === SET_RECEIPT){
    const { name, value } = action.payload
    return{
        ...state,
        [name]:value
    }
}

if(action.type === FILTER_PAYMENT){

    const { payments:{all_payments}, receipt} = state
   
    let paymentReceipt = [...all_payments]
    paymentReceipt = paymentReceipt.filter((payment)=>{
       return payment.mpesaReceipt.startsWith(receipt)
    })
    return{
        ...state,
        payments:{
            ...state.payments,
            filter_payment:paymentReceipt,
        }
    }
}


// delete payment

if(action.type === DELETE_PAYMENT_START){
    return{
        ...state,
        delete_payment:{
            ...state.delete_payment,
            loading:true,
        }
    }
}

if(action.type === DELETE_PAYMENT_SUCCESS){
    return{
        ...state,
        delete_payment:{
            ...state.delete_payment,
            loading:false,
            success:true,
            msg:'payment deleted successfully'
        }
    }
}
if(action.type === DELETE_PAYMENT_ERROR){
    return{
        ...state,
        delete_payment:{
            ...state.delete_payment,
            loading:false,
            error:true,
            msg:'payment not deleted. try again'
        }
    }
}


if(action.type === RESET_DELETE_PAYMENT){
    return{
        ...state,
        delete_payment:{
            ...state.delete_payment,
            error:false,
            msg:'', 
            success:false,
        }
    }
}

// users
if(action.type === GET_USERS_START){
    return{
        ...state,
        users:{
            ...state.users,
            loading:true,
        }
    }
}
if(action.type === GET_USERS_SUCCESS){
    return{
        ...state,
        users:{
            ...state.users,
            loading:false,
            all_users:[...action.payload],
            filter_users:[...action.payload],
            success:true,
            msg:'Success. all users loaded'
        }
    }
}

if(action.type === GET_USERS_ERROR){
    return{
        ...state,
        users:{
            ...state.users,
            loading:false,
            eror:true,
            msg:'Error occured while loading users'
        }
    }
}



// filter user by email

if(action.type === FILTER_USERS){
    const { users:{all_users}, email } = state
    let filter_users = [...all_users]
    filter_users = filter_users.filter((user)=>{
        return user.email.startsWith(email)
    })

    return{
        ...state,
        users:{
            ...state.users,
            filter_users,
        }
    }
}




// single user

if(action.type === GET_SINGLE_USER_START){
    return{
        ...state,
        singleUser:{
            ...state.singleUser,
            loading:true,
        }
    }
}
if(action.type === GET_SINGLE_USER_SUCCESS){
    return{
        ...state,
        singleUser:{
            ...state.singleUser,
            loading:false,
            success:true,
            msg:'User loaded successfully',
            user:action.payload
        }
    }
}

if(action.type === GET_SINGLE_USER_ERROR){
    return{
        ...state,
        singleUser:{
            loading:false,
            error:true,
            msg:'Error loading user'
        }
    }
}



throw new Error(`No matching ${action.type} action type`)
}
export default adminReducer
