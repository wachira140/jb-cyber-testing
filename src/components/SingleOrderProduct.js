import React from 'react'
import styled from 'styled-components'

const SingleOrderProduct = ({items}) => {
    return (
        <Wrapper>

            { items &&  <div className='item-container'>
                {
                    items.map((item)=>{
                        const { _id, image, name , color, price, amount} = item
                        
                        return(
                            <div className='item' key={_id}>
                               <div className = 'image-container'>
                                    <img src={image} alt={name} className='img-fluid'/>
                                  </div>    
                                  <div className='details'>
                                      <div className='item-detail' >
                                              <h5> name  <span>{name}</span></h5>
                                              <h5>color  <span>{color}</span></h5>
                                      </div>
                                      <div className='item-detail' >
                                              <h5> amount  <span>{amount}</span></h5>
                                              <h5> price  <span>{price}</span></h5>
                                      </div>
                                      </div>      
                            </div>
                        )
                    })
                }
                
                </div>}
            
        </Wrapper>
    )
}


const Wrapper = styled.article`

.item{
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content:center;
    align-content:Center;
    background: var(--clr-white);
    box-shadow: var(--dark-shadow);
    padding: 1rem 0.25rem;
    margin-bottom:0.25rem;
    border-radius: var(--radius)
}
.image-container{
    height:75px;
    width:75px;
}
img{
   height:100%;
   width:100%;
}

.details{
    display:grid;
    grid-template-columns:1fr 1fr;
}

h5{
    display:grid;
    grid-template-rows:1fr 1fr;
    justify-content:center;
    color: var(--clr-green-dark);
    text-align:center;
    span{
        color: var(--clr-grey);
    }
}
@media (min-width: 576px){
    .item-detail{
        display:grid;
        grid-template-columns: 1fr 1fr;
    }
}

`
export default SingleOrderProduct
