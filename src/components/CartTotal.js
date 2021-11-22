import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/cartContext'
import { useAuthContext } from '../context/authContext'
import { formatPrice}from '../utils'
const CartTotal = () => {
    const { subtotal,cart_Items } = useCartContext()
    const { user } = useAuthContext()

const { login_Status } = user



   
    return (
        <Wrapper>
        <div>
            <article>
                <h5>subtotal : <span>{formatPrice(subtotal)}</span></h5>
                {cart_Items.length >= 1 &&  <p> transport :<span>local delivery cost not included. See on next step</span></p>}
                <hr />
                <h4>total : <span>{formatPrice(subtotal)}</span></h4>
            </article>

            {login_Status ? <Link to={cart_Items.length < 1 ? '#' :'/orders'}>
                <button  className='btn' disabled={ cart_Items.length < 1}>

                checkout
                </button>
            </Link> : <Link to='/login' className='btn'>
                login to checkout
            </Link> }
             
            
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display:grid;
justify-content:center;
margin-top:3rem;
article{
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 2rem 1rem;
}

h5,
h4,
 p{
    display:grid;
    grid-template-columns: 200px 1fr;
}
h4,h5{
    font-weight:bold;
}
.btn{
    width:100%;
    margin-top:1rem;
}

 @media (min-width: 776px) {
    justify-content: flex-end;
  }

`

export default CartTotal
