import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import SectionTitle from './SectionTitle'
import { useProductContext } from '../context/productContext'
import { formatPrice } from '../utils'

const Featured = () => {

    const {featured} = useProductContext()

    return (
        <Wrapper>
            <div className="featured-container">
                <SectionTitle title='featured'  linkto='featured' />
                    <div className="product-container">
                        <div className="product-center">
                        {/* ************product start****** */}
                        { featured.map(( product)=>{
                                const {image, desc, name,price, _id} = product
                            return (
                                <Link to={`/products/${_id}`} key={_id}>
                                <div className="product card" >
                                <img src={image} alt={name} />
                                <div className="product-footer">
                                    <p>{`${desc}`.slice(0,16)}...</p>
                                        <h5>{formatPrice(price)}</h5>
                                </div>
                                </div>
                                </Link>
                            )
                        })}
                        {/* ************product end****** */}
                        </div>
                    </div>
            </div>
        </Wrapper>
    )
}

// grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
// grid-row-gap: 0.1rem;
//  grid-column-gap: 10px;
const Wrapper = styled.section`
background:var(--clr-white);
border-radius:4px;
padding:0.15rem;


.product-container{
    width:100%;
    display:flex;
    flex-direction:row;
    // justify-content:center;
    margin-top:1.5rem;
    overflow-x:scroll;
    
}


.product-center{
    display:flex;
    gap:10px;
}


.product{
    width:150px;
    height:auto;
    overflow:hidden;
    padding:0.25rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}

.product-container::-webkit-scrollbar {
  height:5px;
  background-color:#bebcbc;
}


.product-container::-webkit-scrollbar-track {
     background: #f1f1f1;
    border-radius: 10px;
}

.product-container::-webkit-scrollbar-thumb {
     background-color:#bebcbc;
   border-radius: 5px;
}

.product img{
    height:120px;
    width:95%;
    margin:0 0.25rem 0.25rem 0.25rem;
    
}
.product-footer p{
    margin-bottom:0.15rem;
}
.product-footer h5{
    margin-bottom:0.15rem;
    font-weight:bold;
    font-size:1rem;
}


@media (min-width: 576px){
   .product{
    width:180px;
   } 
   .product img{
       height:150px;
   }
}

`

export default Featured
