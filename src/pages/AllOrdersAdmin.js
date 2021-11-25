import React ,{useEffect}from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FaTrash, FaSpinner } from 'react-icons/fa'
import { GrFormView } from 'react-icons/gr'
import { useOrdersContext } from '../context/ordersContext'

const AllOrdersAdmin = () => {
    const { 
        getOrders,
        get_All_Orders,
         deleteOrder, 
         delete_Order,
          resetDeleteOrder
        } = useOrdersContext()
    
    const { 
        orders,
        loading,
         error, 
         msg 
        } = get_All_Orders



useEffect(()=>{
    getOrders()
     // eslint-disable-next-line 
},[])


if(loading){
    return(
        <Wrapper>
            <div className='center'>
            <FaSpinner className='icon spinner'/>
            </div>
        </Wrapper>
    )
}


if(error){
    return(
        <Wrapper>
            <div className='center error'>
            <h5>{msg}</h5>
            </div>
        </Wrapper>
    )
}


if(delete_Order.loading){
    return(
        <Wrapper>
            <div className='center'>
            <FaSpinner className='icon spinner'/>
            <h5>{delete_Order.msg}</h5>
            </div>
        </Wrapper>
    )
}

if(delete_Order.error){
    return(
        <Wrapper>
            <div className='center error'>
            <h5>{delete_Order.msg}</h5>
             <button type='button' 
                className='btn'
                onClick={()=>resetDeleteOrder()}>
                    try again
                </button>
            </div>
        </Wrapper>
    )
}



if(orders.length < 1){
    return(
         <Wrapper>
            <div className="empty">
            <h4>no orders</h4>
                <h5>you're not doing enough</h5>
            </div>
        </Wrapper>
    )
}


    return (
         <Wrapper>
            <div className='header'>
                <h5>({orders.length}) orders</h5>
            </div>
            <div className ='body'>
                <table className='table section-center'>
                <thead>

                <tr className='table-header'>
                <th>#</th>
                <th>Name</th>
                <th>Total</th>
                <th>Location</th>
                <th>Pick-up</th>
                <th>view</th>
                <th>Delete</th>
                </tr>
                </thead>

            <tbody>
                { orders.map((item, index)=>{
                    const { name,  total ,_id, status, location, pick_up } = item
                   
                    return (
                <tr className={ 
                    status==='paid' ? ('items paid') :status ==='pending'? ('items pending'): 'items'}
                        key={_id}>
                            
                    <td className='item-content'>{index +1}</td>
                    <td className='item-content'>{!name ?'random' : name.slice(0,6) }</td>
                    <td className='item-content'>{total}</td>
                    <td className='item-content'>{location}</td>
                    <td className='item-content'>{!pick_up ?'random' : pick_up.slice(0,6) }</td>
                    <td className='item-content'>
                        <Link to={`/admin/view-user-order/${_id}`}>
                             <GrFormView className='view'/>
                         </Link>
                          </td>
                    <td className='item-content'><FaTrash className={status === 'failed'? 'failed' : 'delete'} onClick={()=>deleteOrder(_id)} /></td>
                </tr>

                    )
                })}
            </tbody>
            </table>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
   min-height:100vh;
   position:relative;
    .header{
        background: var(--clr-white);
        display:flex;
        justify-content:flex-end;
        align-items:center;
        padding: 0.4rem 1rem;
        margin-bottom:0.75rem;
        box-shadow: var(--dark-shadow);
        border-radius: var(--radius);

        h5{
            margin:0;
        }

    }
    .center{
position:absolute;
background:rgba(255, 255, 255, 0.752);
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
    color: red;
}

.empty{
    flex-direction:column;
    padding:0 2rem;
    text-align:center;
    color: red;
    h5{
        color: var(--clr-green-dark);
    }
}

    .table{
    text-align:start;
   border:1px solid var(--clr-gray);
   box-shadow: var(--dark-shadow);
}

// .table tbody:nth-child(even){
//     background-color:var(--clr-white);
// }
// tbody tr:nth-child(odd){
//     background-color:var(--clr-grey-9);
// }
.table-header th{
    padding-bottom:1rem;
    font-family: Georgia, 'Times New Roman', Times, serif;
    background:var( --clr-white);
    text-align:center;
}
tbody{
    font-family:"Roboto", sans-serif;
}
.items{
    font-size:1.05rem;
    font-weight:400;
    color:var(--clr-grey-1);
}

.pending{
    background: var(--clr-orange);
}

.paid{
    background: var(--clr-green-light);
}

.failed{
    background: var(--clr-red-dark);
    color: var(--clr-white);
}

.item-content{
    text-transform:capitalize;
    text-align:center;
    font-size:0.85rem;
}

@media(min-width: 576px){
    .item-content{
        font-size:1rem;
    }
}

td{
    padding:0.5rem 0.25rem 0.5rem 0.45rem;
    svg{
        font-size:1rem
    }
    svg:hover{
        cursor:pointer;
    }
    .view{
        color:var( --clr-green-dark);
        font-size:1.25rem;
    }
    .delete{
        color:var(--clr-red-dark);
    }
    .featured{
        color:var(--clr-green-dark);
    }
}
`

export default AllOrdersAdmin
