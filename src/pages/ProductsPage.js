import React from 'react'
import styled from 'styled-components'
import { useProductContext } from '../context/productContext'
import {AllProductsList, Filters, Sort} from '../components'
import { Error} from '../components/index'

const ProductsPage = () => {
  const { isError } = useProductContext()

  if(isError){
    return (
      <Error />
    )
  }
    return (
        <Wrapper className=' col-md-10 col-lg-11 mx-auto'>
            <div className="products">
                <Filters />
                <div>
                    <Sort />
                 <AllProductsList />
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
padding: 4rem auto;
.products{
    display:grid;
    gap: 3rem 1.5rem;
    position:relative;
    margin: 1rem auto;
}


  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }


`

export default ProductsPage
