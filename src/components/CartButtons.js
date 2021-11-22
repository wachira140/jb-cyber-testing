import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import styled from 'styled-components'

const CartButtons = ({decrease, increase, amount}) => {

    return (
        <Wrapper>
            <FaMinus className='icon' onClick={decrease}/>
            <p>{amount}</p>
            <FaPlus className='icon' onClick={increase} />
        </Wrapper>
    )
}

const Wrapper = styled.article`
    display:flex;
    justify-content:center;
    align-content:center;
    gap:4px;
    text-align:center;
    .icon{
        font-size:0.95rem;
        height:24px;
    }
    p{
        font-size:1rem;
        align-self:center;
        margin:0;
        padding:0;
    }
`

export default CartButtons
