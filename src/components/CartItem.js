import React from 'react'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../context/cartContext'
import { CartButtons } from './index'


const CartItem = ({item, deleteItem}) => {
    
    const {toggleCartAmount} = useCartContext()

    const { image,price, name, _id, amount} = item

    const increase = ()=>{
            toggleCartAmount(_id, "inc")
                }
const decrease = ()=>{
     toggleCartAmount(_id, "dec")
    }
    return (
      <Wrapper>
             <div className="single-item ">
                    <div className='item'>
                   <div className="image">
                       <img src={image} alt={name} className='img-fluid'/>
                   </div>
                   <h5 className="name">{name}</h5>
                     <h5>kes {price * amount}</h5>
                     <CartButtons 
                        decrease={decrease}
                         increase={increase} 
                         amount={amount} />
                    <button type='button' className='delete-btn' onClick={()=>deleteItem(_id)}>
                       <FaTrash />
                   </button>
                    </div>
                    <hr />
                </div>
       </ Wrapper>
    )
}

const Wrapper = styled.article`

 background: var(--clr-white);
 box-shadow: var(--dark-shadow);
 border-radius: var(--radius);
.item{
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
    column-gap:2rem;
    align-items:center;

    .image{
        height:60px;
        width:60px;
        margin:0.25rem 0 0 0.15rem;
        img{
            height:100%;
            width:100%;
            background-position: center;
            background-size:cover;
            background-repeat:no-repeat;
        }
    }
    
    
    .delete-btn{
        color: var(--clr-white);
        background:red;
        border:transparent;
        letter-spacing: var(--spacing);
        width:1.25rem;
        height:1.25rem;
        display: flex;
        align-items:center;
        justify-content:center;
        border-radius: var(--radius);
        font-size:0.75rem;
        cursor: pointer;
        margin-right:0.15rem;
    }
}

@media (max-width: 576px){
    .item{
        grid-template-columns:1fr 3fr 1fr 1fr 1fr;
        
    }
     .name{
        overflow-x:auto;
        align-items:center;
    }
    
}
@media(min-width: 768px){
    
    .image{
        min-height:80px;
        min-width:80px;
    }
}

`

export default CartItem
