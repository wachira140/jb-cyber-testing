import React,{ useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components'
import {useAuthContext} from '../context/authContext'



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
const { verify, verifyLink} = useAuthContext()

const query = useQuery();

useEffect(() => {
   verifyLink( query)
   // eslint-disable-next-line 
}, [])


if(verify.load){
    return (
        <Wrapper>
            <h5>loading...</h5>
        </Wrapper>
    )
}
if(verify.error){
    return (
        <Wrapper>
            <h5>there was an error, please check your verification link </h5>
        </Wrapper>
    )
}

    return (
        <Wrapper>
           <h2>acount confirmed</h2>
           <Link to='/login' className='btn'>
               please login
           </Link>
        </Wrapper>
    )
}


const Wrapper = styled.article`
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding: 0 2rem;
text-align:center;

`

export default VerifyEmail
