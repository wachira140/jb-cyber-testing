import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'


const PrivateRoute = ({children, ...rest}) => {
    const { user } = useAuthContext()
const { login_Status, loading } = user



    return (
        <Route 
        {...rest}
        render={()=>{
            return login_Status && !loading ? children : <Redirect to='/'></Redirect>
        }}></Route>
    )
}

export default PrivateRoute
