import React, { useEffect} from 'react'
import {useParams,  useHistory} from 'react-router-dom'
import { useOrdersContext } from '../context/ordersContext'
import { 
    Loading,
    Error,
    SingleOrderContent,
}  from '../components/index'






const SingleOrder = () => {
const { 
       single_order_load,
       single_order_error,  
       viewSingleOrder,
       single_order
     } = useOrdersContext()




    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
       viewSingleOrder(id)
       // eslint-disable-next-line 
    }, [id])

    
    useEffect(()=>{

        if(single_order_error){
            setTimeout(()=>{
        history.push('/ordersandPayments')
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
     <SingleOrderContent singleOrder = {single_order} />
    )
}




export default SingleOrder
