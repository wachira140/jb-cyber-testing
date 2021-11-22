import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import {FaSpinner, FaTrash} from 'react-icons/fa'
import { GrFormView } from 'react-icons/gr'
import { useOrdersContext } from '../context/ordersContext'

const SingleUser = () => {

    const { id } =useParams()

    const { 
        get_All_Orders,
         deleteOrder,
          delete_Order,
          resetDeleteOrder
         } = useOrdersContext()


    const { loading, error, msg } = delete_Order
    const { orders } = get_All_Orders

    const userOrders = orders.filter((order)=>order.user === id)



    
if(get_All_Orders.loading){
    return(
        <Wrapper>
            <div className='center'>
            <FaSpinner className='icon spinner'/>
            </div>
        </Wrapper>
    )
}
if(loading){
    return(
        <Wrapper>
            <div className='center'>
            <FaSpinner className='icon spinner'/>
            <h5>{msg}...</h5>
            </div>
        </Wrapper>
    )
}


if(error){

     return(
            <Wrapper>
                <div className='center error'>
                <h5>{msg}</h5>
                <button type='button' 
                className='btn'
                onClick={()=>resetDeleteOrder()}>
                    try again
                </button>
                </div>
            </Wrapper>
        )
}

if(userOrders.length < 1){
    return(
         <Wrapper>
            <div className="center empty">
            <h4>no orders</h4>
                <h5>the user has no current orders</h5>
            </div>
        </Wrapper>
    )
}

    return (
        <Wrapper>
            <div className='header'>
                <h5 className='title'>({userOrders.length}) user orders</h5>
            </div>

        {
            userOrders.map((item)=>{
                const { _id, total, status } = item
                return(

                    <div className='single-order' key={_id}>
                        <h5 className='item'>
                            status
                            <hr />
                            <span>{status}</span>
                        </h5>
                        <h5 className='item'>
                            total
                            <hr />
                            <span>{total}</span>
                        </h5>
                        <h5 className='item'>
                            view
                            <hr />
                             <Link to={`/admin/view-user-order/${_id}`}>
                             <GrFormView className='view'/>
                         </Link>
                        </h5>
                        <h5 className='item'>
                            delete
                            <hr />
                            <span><FaTrash className='delete' onClick={()=>deleteOrder(_id)} /></span>
                        </h5>
                    </div>
                )
            })
        }
        </Wrapper>
    )
}

const Wrapper = styled.section`
min-height:50vh;
position:relative;

    .header{
        background: var(--clr-white);
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding: 0.4rem 0.55rem;
        margin-bottom:0.75rem;
        box-shadow: var(--dark-shadow);
        border-radius: var(--radius);
        .title{
            margin:0;
            color: var(--clr-grey);
        }

    }

.single-order{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content:center;
    align-items:center;
    background: var(--clr-white);
    border-radius: var(--radius);
    padding: 1rem 0;
    margin-bottom:6px;
    .item{
        display:flex;
        flex-direction:column;
        text-align:center;
    }
}
h5{
    font-weight:500;
    color: var(--clr-orange);
}
hr, span{
    color: var(--clr-black);
}


span{
    svg{
        font-size:1.25rem;
        cursor:pointer;
        margin:0;
    }
    .view{
        color:green;
    }
    .delete{
        color: var(--clr-red-dark);
    }
}

    .center{
position:absolute;
background:rgba(255, 255, 255);
box-shadow: var(--dark-shadow);
left:50%;
bottom:0;
transform:translateX(-50%);
height:100%;
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

svg{
    font-size:2rem;
}
}

.error{
    padding:0 2rem;
    text-align:center;
}
.center h5{
    color: red;
}
.error h5{
    color: red;
}

`

export default SingleUser
