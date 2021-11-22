import React, { useEffect} from 'react'
import styled from 'styled-components'
import {useParams, Link,  useHistory} from 'react-router-dom'
import { useOrdersContext } from '../context/ordersContext'
import { 
    Loading,
    Error,
    SingleOrderProduct,
}  from '../components/index'

const AdminSingleOrder = () => {
   const { 
       single_order_load,
       single_order_error,  
       viewSingleOrder,
       single_order,
       clearErrorSingleOrder,
     } = useOrdersContext()

      const { 
          name,
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
        } =  single_order



    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
       viewSingleOrder(id)
       // eslint-disable-next-line 
    }, [id])

    
    useEffect(()=>{

        if(single_order_error){

            setTimeout(()=>{
        history.push('/admin/orders')
                clearErrorSingleOrder()
            },3000)
            
        }
        // eslint-disable-next-line 
    },[single_order_error])

if(single_order_load){
    return(
        <Loading/>
    )
}
if(single_order_error){
    return(
        <Error/>
    )
}

  return (
           <Wrapper>

                { single_order &&
            <div className ='container'>
                
                <SingleOrderProduct items = {orderItems} />
                <div className="user-details">
                    <h5>name <span>: {name}</span></h5>
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
                    <Link to='/admin/orders' className="btn" >
                                back to orders
                    </Link>
        </Wrapper>
    )
}
const Wrapper = styled.section`
  background: var(--clr-grey-10);
    padding:1rem 0;
    min-height:75vh;
    min-width:100%;
    display:flex;
    flex-direction:column;
    .container{
        display:block;
    }
    .user-details{
        background: var(--clr-white);
        padding: 1rem 0.55rem;
        box-shadow: var(--light-shadow);
        border-radius: var(--radius);
        text-align:start;
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
        
    }
`

export default AdminSingleOrder
