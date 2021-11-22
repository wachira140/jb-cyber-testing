import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NotFound = () => {
    return (
        <Wrapper className='page-404'>
            <h3>404</h3>
            <p>page not found</p>
            <Link to='/'>
                <button type='button' className='btn'>
                    back home
                </button>
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:var(--clr-grey-10);
    min-height:calc(100vh - 3rem);

     h3{
        font-size:4rem;
        color:var(--clr-grey-5)
    }
    p{
        font-size:2rem;
         color:var(--clr-grey-4);
         text-transform:capitalize;
    }
`

export default NotFound
