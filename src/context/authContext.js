import React, {useContext, useEffect, useReducer} from 'react'
import reducer from '../reducer/authReducer'
import axios from 'axios'
import {
    UPDATE_REGISTER_DETAILS,
    SUBMIT_USER_START,
    SUBMIT_USER_ERROR,
    SUBMIT_USER_SUCCESS,
    RESET_STATES,
    SET_LOGIN_DETAILS,
    LOGIN_USER_START,
    LOGIN_USER_ERROR,
    RESET_LOGIN,
    LOGIN_USER_SUCCESS,
    LOAD_ON_VERIFY,
    VERIFY_SUCCESS,
    VERIFY_ERROR,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_START,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_FORGOT_PASSWORD,
    NEW_PASSWORD,
    NEW_PASSWORD_START,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_ERROR,
    CLEAR_RESET_DETAILS,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    SET_USER_DEFAULT,
    SET_USER,
    SET_USER_START,
}from '../actions'




const getUserInLocalStorage = ()=>{
    let user = localStorage.getItem('user')
    if(user){
        return JSON.parse(localStorage.getItem('user'))
    }
    return false
}





const initialState = {
    auth_Loading:false,
    isSuccess:{
        msg:'',
        success:false,
    },
    isError:false,
    register:{
            name:'',
            email:'',
            password:'',
            },
    login:{
        email:'',
        password:'',
    },
   login_Success:getUserInLocalStorage(),
  
    load_On_Login:false,
    isLoginError:false,

    verify:{
        success:false,
        load:false,
        error:false,
    },
     user:{
        name:null,
        role:null,
        userId:null,
        login_Status:false,
        loading:false,
    },

    reset:{
        email:'',
        success:false,
        msg:'',
        loading:false,
        error:false,
    },
    password:'',
    newPassword:{
        loading:false,
        success:false,
        error:false,
        msg:''
    },
    logout:{
        loading:true,
        success:false,
        error:false,
    }
}

const authContext = React.createContext()

const url = "https://cyber-api-v1.herokuapp.com/api/v1"
// const url = "/api/v1"

 export const AuthProvider = ({children}) => {
    const [state, dispatch ] = useReducer(reducer, initialState)







    const fetchRegisterDetails = (e)=>{
        const name = e.target.name
        const value = e.target.value
        dispatch({type:UPDATE_REGISTER_DETAILS, payload:{name, value}})
    }

    const registerUser = async(e)=>{
         e.preventDefault()
        dispatch({type:SUBMIT_USER_START})
        const { name, email, password } = state.register
        const user = { name, email, password}
        try {
           const response =  await axios.post(`${url}/auth/register`,user)
            const {data, status} = await response

                if(status === 201){
                    dispatch({type:SUBMIT_USER_SUCCESS, payload: data.msg})
                }
        } catch (error) {
            dispatch({type:SUBMIT_USER_ERROR})
        }
    }




    const verifyLink = async (query)=>{
        dispatch({type:LOAD_ON_VERIFY})
    try {

        await axios.post(`${url}/auth/verify-email`,{
            verificationToken: query.get('token'),
            email: query.get('email'),
        })
        dispatch({type:VERIFY_SUCCESS})
    } catch (error) {
        dispatch({type:VERIFY_ERROR})
        
    }
}


    const fetchLoginDetails = (e)=>{
        const name = e.target.name
        const value = e.target.value

        dispatch({type:SET_LOGIN_DETAILS, payload:{ name, value}})
    }



    
    const loginUser = async(e)=>{
        e.preventDefault()

        dispatch({type:LOGIN_USER_START})


        const { email, password } = state.login
        const user = {email, password}
        try {
            await axios.post(`/api/v1/auth/login`, user)
            
            dispatch({type:LOGIN_USER_SUCCESS})
        } catch (error) {
            dispatch({type:LOGIN_USER_ERROR})
        }
    }


// forgot password send email for reset

const resetPasswordEmail  = (e)=>{
    const email = e.target.value
    dispatch({type:FORGOT_PASSWORD, payload:email})
}

const resetPassword = async(e)=>{
    e.preventDefault()
    dispatch({ type:FORGOT_PASSWORD_START})

    const email = state.reset.email
    try {
        const { data } = await axios.post(`${url}/auth/forgot-password`,{email} )
        dispatch({ type:FORGOT_PASSWORD_SUCCESS, payload: data.msg})
    } catch (error) {
        
        dispatch({ type:FORGOT_PASSWORD_ERROR})
    }

}


const handleChange = (e)=>{
    const newPassword = e.target.value
    dispatch({type:NEW_PASSWORD, payload: newPassword})
}

const resetP = async(query)=>{
    dispatch({type:NEW_PASSWORD_START})

    try {
             await axios.post(`${url}/auth/reset-password`,{
                token:query.get('token'),
                email:query.get('email'),
                password:state.password
            })
        dispatch({type:NEW_PASSWORD_SUCCESS})
    } catch (error) {
        console.log(error);
        dispatch({type:NEW_PASSWORD_ERROR})
    }
}


// logout

const  logOut = async()=>{
    
    dispatch({type: LOGOUT_START})

    try {

    await axios.delete(`/api/v1/auth/logout`)
        // showUser()
        dispatch({type: LOGOUT_SUCCESS})
    } catch (error) {
        
        dispatch({type: LOGOUT_ERROR})
    }
 }






const clearResetDetails =()=>{
    dispatch({type:CLEAR_RESET_DETAILS})
}


    
const resetForgotDetails = ()=>{
    dispatch({type:RESET_FORGOT_PASSWORD})
}



    const resetLogin = ()=>{
        dispatch({ type:RESET_LOGIN})
    }

    const resetDetails = ()=>{
        dispatch({type:RESET_STATES})
    }


// current user logged in
  const showUser = async ()=>{
      dispatch({type:SET_USER_START})
  try {
    const response = await axios.get(`/api/v1/users/showUser`);
    const data = response.data.user
    dispatch({type:SET_USER, payload:data})
  } catch (error) {
    dispatch({type:SET_USER_DEFAULT})
  }
}





useEffect(() => {
  localStorage.setItem('user',JSON.stringify(state.login_Success))
}, [state.login_Success])






useEffect(() => {
    if(state.login_Success){
        showUser()
    }
    
    // eslint-disable-next-line 
}, [])






   return (
    <authContext.Provider value={{
        ...state,
        fetchRegisterDetails ,
        registerUser,
        fetchLoginDetails,
        resetDetails,
        loginUser,
         resetLogin ,
         verifyLink,
         resetPassword ,
         resetPasswordEmail,
         resetForgotDetails,
         resetP,
          handleChange,
          clearResetDetails,
          logOut,
    }}>
{children}</authContext.Provider>
   )
}

export const useAuthContext = ()=>{
    return useContext(authContext)
}


