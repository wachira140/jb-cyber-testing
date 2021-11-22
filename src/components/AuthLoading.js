import React from 'react'
import styled from 'styled-components'
import {FaSpinner} from 'react-icons/fa'

const AuthLoading = () => {
    return (
        <Wrapper>
            <FaSpinner className='icon spinner'/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .icon{
        font-size:2.5rem;
        transition: var(--transition);
    }
`

export default AuthLoading
