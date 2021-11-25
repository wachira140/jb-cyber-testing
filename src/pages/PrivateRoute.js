import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'


const PrivateRoute = ({children, ...rest}) => {
    const { user, load_On_Login } = useAuthContext()
const { login_Status } = user



    return (
        <Route 
        {...rest}
        render={()=>{
            return login_Status && !load_On_Login ? children : <Redirect to='/'></Redirect>
        }}></Route>
    )
}

export default PrivateRoute
