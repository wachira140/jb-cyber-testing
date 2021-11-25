import React from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../context/authContext'
import { FaSpinner } from 'react-icons/fa'

const AuthWrapper = ({children}) => {
    const { user, login_Success} = useAuthContext()




    if(login_Success){

        if(user.loading){
            return(
                
            <Wrapper>
            <FaSpinner className='icon spinner'/>
        </Wrapper>

    )
    }
    }

    return (
        <>
          {children}  
        </>
    )
}

const Wrapper = styled.div`
height:100vh;
background: var(--clr-grey-10);
display:flex;
justify-content:center;
align-items:center;
    .icon{
        font-size:2rem;
    }
`

export default AuthWrapper
