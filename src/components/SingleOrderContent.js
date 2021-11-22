import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {
    SingleOrderProduct
}from './index'

const SingleOrderContent = ({singleOrder}) => {

    
     const { 
         orderItems, 
         contact, 
         courier, 
         createdAt, 
         pick_up, 
         location, 
         status, 
         subtotal,
          transport, 
          total,
        } = singleOrder


    return (
           <Wrapper>

                { singleOrder &&
            <div className ='container'>
                
                <SingleOrderProduct items = {orderItems} />
                <div className="user-details">
                    <h5>contact <span>: {contact}</span></h5>
                    <h5>location <span>: {location}</span></h5>
                    <h5>courier <span>: {courier}</span></h5>
                    <h5>pick_up <span>: {pick_up}</span></h5>
                    <h5>subtotal <span>: {subtotal} kes</span></h5>
                    <h5>transport <span>: {transport} kes</span></h5>
                    <h5>total :<span>: {total} kes</span></h5>
                    <h5>status <span>: {status}</span></h5>
                    <h5>order date <span>: {createdAt}</span></h5>
                </div>
            </div>
                
            }
                    <Link to='/ordersandPayments' className="btn" >
                                back to orders
                    </Link>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
    padding:1rem 0;
    min-height:75vh;
    width:auto;
    display:flex;
    flex-direction:column;
    .user-details{
        background: var(--clr-white);
        padding: 1rem 0.55rem;
        box-shadow: var(--light-shadow);
        border-radius: var(--radius);
        h5{
            display:grid;
            grid-template-columns: 1fr 2fr;
            color: var(--clr-orange);
            span{
                color: grey;
            }
        }
    }
    .btn{
        margin: 1rem auto;
        background: var(--clr-orange);
        color: var(--clr-black);
        
    }
`

export default SingleOrderContent
