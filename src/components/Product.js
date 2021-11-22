import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useCartContext } from '../context/cartContext'
import { formatPrice } from '../utils'

const Product = ({product}) => {

    const { addToCart } = useCartContext()

    return (
        <Wrapper>
    { product.map((item)=>{
        const {_id, image, price, desc, name } = item
        return (
            <div className="product" key={_id}>
                <Link to={`/products/${_id}`}>
                <img src={image} alt={name} className='img-fluid'/>
                <div className="product-footer">
                    <p>{desc.slice(0,21)}...</p>
                    <h5>{ formatPrice(price)}</h5>
                </div>
                </Link>
                <button className='btn cart-btn' onClick={()=>addToCart(item)}>add to cart</button>
            </div>
        )
    })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
display:grid;
grid-template-columns: repeat(auto-fill, minmax(172px, 1fr));
grid-row-gap: 0.05rem;
 grid-column-gap: 10px;

 .product{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    border-radius:4px;
    background:var(--clr-white);
    box-shadow:var(--dark-shadow);
    padding-top:0.25rem;
    margin:0.45rem 0.25rem;
    transition:var(--transition);
    cursor:pointer;
}
.product:hover{
    transform: scale(1.05)
}
 .product img{
    height:120px;
    width:90%;
    margin-bottom:0.15rem; 
}

.product-footer{
    padding:0 0.05rem;
}
.product-footer p{
    margin-bottom:0.15rem;
}
.product-footer h5{
    margin-bottom:0.15rem;
    font-weight:bold;
    font-size:0.85rem;
    text-align:center;
}
.cart-btn{
    background:var(--clr-orange);
    color:var(--clr-black);
    width:90%;
    font-size:0.75rem;
    margin:0.25rem auto;
}

@media (min-width: 576px){
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .product img{
       height:180px;
      
   }
}

@media (min-width: 992px){
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    .product img{
       height:180px;
      
   }
}

`

export default Product
