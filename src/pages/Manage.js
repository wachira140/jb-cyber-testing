import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {ImCross} from 'react-icons/im';
import { useAdminContext } from '../context/adminContext'



const Manage = ({url}) => {
    const { closeSidebar } = useAdminContext()


    return (
        <Wrapper>
                <ImCross className='close-btn' onClick={closeSidebar} />
            <Link to={`${url}`} className='link' onClick={closeSidebar} >
            <button type='button' className='btn'>
                store
            </button>
                </Link>


            <Link to={`${url}/payments`} className='link' onClick={closeSidebar} >
            <button type='button' className='btn'>
               payments
            </button>
                </Link>

            <Link to={`${url}/orders`} className='link' onClick={closeSidebar} >
            <button type='button' className='btn'>
               orders
            </button>
                </Link>
            <Link to={`${url}/users`} className='link' onClick={closeSidebar} >
            <button type='button' className='btn'>
               users
            </button>
                </Link>
        
            <Link to={`${url}/add-product`} className='link' onClick={closeSidebar} >
            <button type='button' className='btn'>
                add product
            </button>
                </Link>
        </Wrapper>
    )
}

const Wrapper = styled.article`
display:flex;
flex-direction:column;
padding:1rem 0.5rem;


.close-btn{
    align-self:end;
    margin-bottom:1rem;
    margin-right:1rem;
    color: var(--clr-red-dark);
    font-size:1.25rem;
    cursor:pointer;
}


.link{
    box-shadow: var(--dark-shadow);
    border:1px var(--clr-black) solid;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    .btn{
        font-weight:bold;
        color: var(--clr-black);
        min-width:100%;
        background: var(--clr-white);
    }
}

.btn:hover{
    background: var(--clr-black);
    color: var(--clr-white);
}

@media(min-width: 768px){
    .close-btn{
        display:none;
    }
}


`

export default Manage
