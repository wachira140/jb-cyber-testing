import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ListView = ({products}) => {
    return (
            <Wrapper>
    {products.map((item)=>{
        const {_id, image, price, desc, name } = item
        return (
            <article  key={_id}>
                 <img src={image} alt={name} className='img-fluid'/>
               <div>
                   <h4>{name}</h4>
                   <h5 className="price">Ksh {price}</h5>
                    <p>{desc.substring(0,150)}...</p>
                     <Link to={`/products/${_id}`} className='btn'>
                        Details
                    </Link>
               </div>
            </article>
        )
    })}
        </Wrapper>
    )
}

const Wrapper = styled.section`
display: grid;
  row-gap: 1rem;

  article{
      padding:0.55rem;
      background: var(--clr-white);
      border-radius:var(--radius);
  }

  img{
      width:100%;
      width:250px;
      display:block;
      height:200px;
      margin-bottom:1rem;
      border-radius:var(--radius);
  }
    h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }

`

export default ListView
