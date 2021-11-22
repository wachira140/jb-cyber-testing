import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cartContext'
import { CartItem } from './index'


const CartContent = () => {

    const { cart_Items, deleteItem } = useCartContext()

    if( cart_Items.length < 1){
        return (
            <Wrapper>
                <h4>your cart is empty</h4>
                <h5>continue shopping to fill</h5>
            </Wrapper>
        )
    } 

    return (
        <div>
            {
                cart_Items.map((item)=>{
                    return ( 
                          <CartItem item ={item} key={item._id} deleteItem={deleteItem}/>
                    )
                })
            }
        </div>
    )
    
}

const Wrapper = styled.section`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding-top:4rem;

    h4{
        color: var(--clr-red-light);
    }
    h5{
        color: var(--clr-green-dark);
    }

    
`


export default CartContent

