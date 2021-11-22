import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import {Link, Redirect} from 'react-router-dom'
import { useOrdersContext } from '../context/ordersContext'
import image from '../images/orders.jpg'
import { formatPrice } from '../utils'
import {
    Loading,
    Error,
} from '../components'

const OrdersAndPayments = () => {

    const {
        currentOrders,
        all_current_orders, 
        all_current_orders_loading,
         all_current_orders_errors,
         deleteOrder,
         payOrder,
         success,
        } = useOrdersContext()




        useEffect(() => {
           currentOrders()
            // eslint-disable-next-line 
        }, [])

       if(success){
           return(

               <Redirect to='/paywithmpesa'/>
           )
       }

         



        if(all_current_orders_loading){
            return(
                <Loading />
            )
        }
        
        if(all_current_orders_errors){
            return(
                <Error />
            )
        }


        if(all_current_orders.length < 1){
            return(
                <Wrapper >
                    <div className='empty-orders'>
                    <h5>you currently have no orders</h5>
                    <p>go shopping to make new orders</p>
                    <button className="btn">
                        <Link to='/products'>
                            shop now
                        </Link>
                    </button>
                    </div>
                </Wrapper>
            )
        }

    return (
        <Wrapper>
            <div className="container col-lg-9">
                { all_current_orders.map((order)=>{
                    const { total, orderItems, status,_id} = order

                   
                
                    return (

                        <article className="single-order"key={_id} >
                            <div className="body">
                    <div className="order-logo">
                        <img src={image} alt="sukari orders" />
                    </div>

                    <div className="order-details">
                    <div className="order-items">
                        <h5>products</h5>
                        <p>({orderItems.length})</p>
                    </div>
                    <div className="total">
                        <h5>total</h5>
                        <h5>{formatPrice(total)}</h5>
                    </div>
                    </div>
                    <div className="order-pay">
                        { status === 'paid' ? <button 
                        type='button' 
                        className='btn paid'
                        disabled={true}>paid</button> :
                        <button 
                        type='button' 
                        className='btn'
                        onClick={()=>payOrder(_id)}>pay</button>}
                        
                    </div>
                    </div>
                    <hr />
                    <div className="order-delete-status">
                        { status !=='paid' && <div className="remove" onClick={()=>deleteOrder(_id)}>
                        <FaTrash />
                        <h5>remove</h5>
                        </div> }
                        
                        <div className="view-order">
                            <Link to={`/orders/${_id}`}>
                                <p className='link'>view order</p>
                            </Link>
                        </div>
                        <div className="status">

                        <h5 >status : <span
                          className={ status ==='paid'?'success' : null}>{status}</span></h5>
                        </div>
                    </div>
                </article>
            )
        })}
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
   min-height:75vh;


    .empty-orders{
    min-height:75vh;
    background: var(--clr-grey-10);
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding: 0 0.55rem;
    h5{
        font-size:1.25rem;
        font-weight:bold;
    }
    p{
        text-transform:capitalize;
        font-size:1rem;
    }
    }

    .container{
        align-items:center;
        padding: 1rem 0;
        h5{
            font-size:0.75rem;
        }
       
    }

.single-order{
    background: var(--clr-white);
    padding: 0.25rem 0.15rem;
    margin-bottom:1rem;
    display:flex;
    flex-direction: column;
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow);
   
}

.order-logo{
    height:80px;
    width:80px;
    img{
        height:100%;
        width:100%;
    }
}

.order-details{
    display: flex;
    grid-template-columns: 1fr 1fr;

    justify-content:space-around;
}



.order-items {
    text-align:center;
    p{

        font-size:bold;
    }
}
.btn{
    color: var(--clr-black);
    background: var(--clr-orange);
}

.paid{
    background: var(--clr-green-dark);
}

.body{
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items:center;
}
.total{
    text-align:center;
}

.order-delete-status{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content:center;
    align-items:flex-end;
    margin: 0 0.55rem;
    gap:2rem;


    .remove{
        display: flex;
        color: var(--clr-orange);
        cursor:pointer;
        font-size: 1rem;
        svg{
            margin-right:0.55rem;
        }
    }
}

.view-order{
    font-style:italic;
    .link{
        color: var(--clr-blue);
        font-size:1.rem;
    }
}

.status{
    span{
        color: var(--clr-orange)
    }
    .success{
    color: var(--clr-green-dark);
}
}
.danger{
    color: var(--clr-red-dark);
}

.success{
    color: var(--clr-green-dark);
}


@media(min-width: 576px){
    .container{
        h5{
            font-size:1rem;
        }
    }
}


`

export default OrdersAndPayments
