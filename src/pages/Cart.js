import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CartTotal from '../components/CartTotal'
import { useCartContext } from '../context/cartContext'
import { CartContent } from '../components/index'



const Cart = () => {
  const { clearCart } = useCartContext()
 
    return (
        <Wrapper>
         <div className="container">
                    <CartContent />
                <div className="link-container">
                <Link to='/products' className="link-btn">
                continue shopping
                </Link>
                <button
                 type="button" 
                 className="link-btn clear-btn" 
                 onClick={clearCart}>
                clear shopping cart
                </button>
            </div>
        <CartTotal />
        </div>
       </ Wrapper>
    )
}


const Wrapper = styled.article`

padding:1rem 0;
background: var(--clr-grey-9);

  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
  @media ( min-width: 776px){
      padding-bottom:5rem;
  }

`

export default Cart
