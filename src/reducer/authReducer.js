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
} from '../actions'

 const authReducer = (state, action)=>{

    if(action.type === UPDATE_REGISTER_DETAILS){
        const { name, value } = action.payload
        return{
            ...state,
            register:{
                ...state.register,
                [name]:value,
            }
        }
    }

    if(action.type === SUBMIT_USER_START){
        return{
            ...state,
            auth_Loading:true,
        }
    }

    if(action.type === SUBMIT_USER_SUCCESS){
        return {
            ...state,
            auth_Loading:false,
            register:{
                name:'',
                email:'',
                password:'',
            },
            isSuccess:{
                ...state.isSuccess,
                        msg:action.payload,
                        success:true,
                    },
        }
    }

    if(action.type === SUBMIT_USER_ERROR){
        return{
            ...state,
            auth_Loading:false,
            isError:true,
        }
    }






//  verify registered user from email

if(action.type === LOAD_ON_VERIFY){
    return{
        ...state,
        verify:{
            ...state.verify,
            load:true
        }
    }
}
if(action.type === VERIFY_SUCCESS){
    return{
        ...state,
        verify:{
            ...state.verify,
            load:false,
        }
    }
}
if(action.type === VERIFY_ERROR){
    return{
        ...state,
         verify:{
            ...state.verify,
            load:false,
            error:true,
        }
    }
}





    if(action.type === RESET_STATES){
        return{
            ...state,
            isError:false,
             isSuccess:{
                        msg:'',
                        success:false,
                    },
        }
    }



    // forgot password

    if(action.type === FORGOT_PASSWORD){
        return {
            ...state,
            reset:{
                ...state.reset,
                email:action.payload
            }
        }
    }


    if(action.type === FORGOT_PASSWORD_START){
        return{
            ...state,
            reset:{
                ...state.reset,
                loading:true,
            }
        }
    }
    if(action.type === FORGOT_PASSWORD_SUCCESS){
        return{
            ...state,
            reset:{
                ...state.reset,
                success:true,
                loading:false,
                msg:action.payload,
            }
        }
    }
    if(action.type === FORGOT_PASSWORD_ERROR){
        return{
            ...state,
            reset:{
                ...state.reset,
                loading:false,
                msg:'error occurred. try again',
                error:true,
            }
        }
    }

    if(action.type === RESET_FORGOT_PASSWORD){
        return{
            ...state,
            reset:{
                ...state.reset,
                msg:'',
                error:false,
            }
        }
    }


    //submit  new password

    if(action.type === NEW_PASSWORD){
    return{
        ...state,
        password:action.payload,
        newPassword:{
            ...state,
        }
    }
}

if(action.type === NEW_PASSWORD_START){
    return{
        ...state,
         newPassword:{
             ...state.newPassword,
                loading:true,
               
    }
    }
}
if(action.type === NEW_PASSWORD_SUCCESS){
    return{
        ...state,
        newPassword:{
        ...state.newPassword,
        loading:false,
        success:true,
        msg:'password reset successfully.'
    }
}
}
    if(action.type === NEW_PASSWORD_ERROR){
        return{
            ...state,
            newPassword:{
                ...state.newPassword,
                loading:false,
                error:true,
                msg:'password reset failed. try again'
            }
        }
        
    }

    // IF ERROR IN NEW_PASSWORD_ERROR
    if(action.type === CLEAR_RESET_DETAILS){
        return{
            ...state,
            newPassword:{
                ...state.newPassword,
                error:false,
                msg:''
            }
        }
    }




        // login start

    if(action.type === SET_LOGIN_DETAILS){
        const { name, value } = action.payload

        return {
            ...state,
            login:{
                ...state.login,
               [name]:value,
            }
        }
    }

    if(action.type === LOGIN_USER_START){
        return{
            ...state,
            load_On_Login:true,
        }
    }

    if(action.type === LOGIN_USER_SUCCESS){
       
        return {
            ...state,
            login_Success:true,
        }
    }

    if(action.type === LOGIN_USER_ERROR){
        return {
            ...state,
            load_On_Login:false,
            isLoginError:true,
        }
    }

    if(action.type === RESET_LOGIN){
         return {
             ...state,
             isLoginError:false,
         }
    }

// logout

if(action.type=== LOGOUT_START){
    return{
        ...state,
        logout:{
            ...state.logout,
            loading:true,
        }
    }
}



if(action.type === LOGOUT_SUCCESS){
    return{
        ...state,
        login_Success:false,
        logout:{
            ...state.logout,
            loading:false,
            success:true,
        },
         user:{
        name:null,
        role:null,
        userId:null,
        login_Status:false,
        loading:false,
    },
    }
}
if(action.type === LOGOUT_ERROR){
    return{
        ...state,
        logout:{
            ...state.logout,
            loading:false,
            error:true,
        }
    }
}


// showUser

if(action.type === SET_USER_START){

    return{
        ...state,
        user:{
            ...state.user,
            loading:true,
        }
    }
}


if(action.type ===  SET_USER){
    const { name, role, userId} = action.payload
    return {
        ...state,
        load_On_Login:false,
        user:{
            ...state.user,
            name,
            role,
            userId,
            login_Status:true,
            loading:false,
        },
    }
}

if(action.type === SET_USER_DEFAULT){
    return{
        ...state,
        user:{
            name:null,
            email:null,
            userId:null,
            login_Status:false,
            loading:false,
        },
    }
}



throw new Error(`No matching ${action.type} action type`)
}
export default authReducer
