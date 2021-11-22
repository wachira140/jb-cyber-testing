import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const PrivateAdminRoute = ({children, ...rest}) => {
     const { user } = useAuthContext()
    const { login_Status, role } = user


    return (
        <Route 
        {...rest}
        render={()=>{
            return login_Status && role === 'admin' ? children : <Redirect to='/'></Redirect>
        }}></Route>
    )
}

export default PrivateAdminRoute
