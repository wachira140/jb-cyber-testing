import React from 'react'
import styled from 'styled-components'
import SectionTitle from './SectionTitle'
import Product from './Product'


const ProductList = ({products, title, subtitle,linkto, filterBy, name}) => {
  
   
    
    return (
        <>
            { products.length >= 1 && 
        <Wrapper className='section'>

            <SectionTitle 
                    title={title} 
                    subtitle={subtitle}
                    linkto={linkto}
                    name={name}
                    filterBy ={ filterBy} /> 

                    
                    <Product product={products}/>  
                    </Wrapper>
                }
                </>
    )
}

const Wrapper = styled.section`
background:var(--clr-grey-7);
box-shadow: var(--light-shadow);
border-radius:4px;
padding:0.15rem;

`
export default ProductList
