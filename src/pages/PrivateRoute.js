import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'


const PrivateRoute = ({children, ...rest}) => {
    const { user } = useAuthContext()
const { login_Status } = user



    return (
        <Route 
        {...rest}
        render={()=>{
            return login_Status ? children : <Redirect to='/'></Redirect>
        }}></Route>
    )
}

export default PrivateRoute
