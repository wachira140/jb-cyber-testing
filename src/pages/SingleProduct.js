import React,{ useEffect } from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { useProductContext } from '../context/productContext'
import { 
    Loading,
    Error,
}  from '../components/index'




const SingleProduct = () => {
    const { fetchSingleProducts,
            singleProduct,
            singleProductLoading,
            singleProductError,
            clearSinglePrdError,
        } = useProductContext()

    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
       fetchSingleProducts(id)
       // eslint-disable-next-line 
    }, [id])



     if(singleProductError){
            setTimeout(()=>{
                clearSinglePrdError()
        history.push('/')
            },300)
        }

    
    
if(singleProductLoading){
    return(
        <Loading/>
    )
}


if(singleProductError){
    return (
        <Error/>
    )
}
    const { image, _id, brand, desc, name,price } = singleProduct
    return (
        <Wrapper>
           <div className="main col-md-10 col-lg-11 mx-auto">
            <Link to='/products' className='btn'>
                back to products
                </Link>
           <div className="section-center pt-3">
               <div className="img-container">
                   <img src={image} alt={name} className='img-fluid' />
               </div>
               <div className="content">
                    <h2 className='name'>{name}</h2>
                    <h5 className='info'>
                       brand  <span>: {brand}</span>
                        </h5>
                    
                    <h5 className='info'>
                       price  <span>: ksh {price}</span>
                        </h5>
                    
                    <p className='info'>
                        sku  <span>{_id}</span>
                    </p>
                    <p className='desc'>
                       {desc}
                    </p>
                <hr /> 
               </div>
           </div>
           </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
background: var(--clr-grey-9);
padding: 2rem 0.25rem;

.section-center{
    display:grid;
    align-items:center;
}
.img-container{
    height:240px;
    width:100%;
    display:flex;
    justify-content:space-between;
    img{
        width:100%;
        height:100%;
    }
}
.content{
    text-transform:capitalize;
    margin-top:0.5rem;
    padding:0.25rem;
    .name{
        color:green;
    }
}

 .desc {
    line-height: 2;
    max-width: 45em;
  }

  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    margin-top:0.45rem;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px){
    display:flex;
    align-items:center;
    justify:content:center;
      .section-center{
          grid-template-columns: 1fr 1fr;
          align-items:center;
      }
      .img-container{
          height:420px;
      }
  }
`

export default SingleProduct
