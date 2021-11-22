import React from 'react'
import styled from 'styled-components'
import { useParams, useHistory, Link } from 'react-router-dom'
import { FaSpinner, FaTrash } from 'react-icons/fa'
import { useAdminContext } from '../context/adminContext'

const SinglePayment = () => {
    const {
         payments,
          delete_Payment,
          delete_payment,
            resetPaymentError,
        } = useAdminContext()

const { id } = useParams()
const {all_payments, loading, error }= payments


const history = useHistory()

const payment = all_payments.filter((item)=>item._id ===id)





if(loading){
    return(
        <Wrapper>
            <div className="loading">
            <FaSpinner className='icon spinner' />
            </div>
        </Wrapper>
    )
}
if(error){
    return(
        <Wrapper>
            <div className="loading error">
            <h5>error occured</h5>
            </div>
        </Wrapper>
    )
}
if(delete_payment.loading){
    return(
        <Wrapper>
            <div className="loading">
            <h5>deleting payment...</h5>
            </div>
        </Wrapper>
    )
}
if(delete_payment.error){
    return(
        <Wrapper>
            <div className="loading error">
            <h5>{delete_payment.msg}</h5>
            <button className="btn" onClick={resetPaymentError}>try again</button>
            </div>
        </Wrapper>
    )
}


if(delete_payment.success){
    setTimeout(()=>{
        resetPaymentError()
        history.push('/admin/payments')
    },3000)
}

    return (
        <Wrapper>
            <div className="container">
               <h5 className='title'>payment details</h5>
               { payment.map((item)=>{
                   const { 
                       name,
                        amount, 
                        order, 
                        phoneNumber, 
                        status,
                         _id,
                         mpesaReceipt,
                         
                    } = item;
                return(
                    <div key={_id}>
               <div className="center" >
                    <div className="name">
                        <h5>name</h5>
                        <p>{name ? name :'random' }</p>
                    </div>
                    <div className="amount">
                        <h5>amount</h5>
                        <p>{amount}</p>
                    </div>
                    <div className="phone">
                        <h5>phone</h5>
                        <p>{phoneNumber}</p>
                    </div>
                    <div className="status">
                        <h5>status</h5>
                        <p>{status}</p>
                    </div>
                    </div>
                    <hr />
                    <div className="center">
                        <div className="receipt">
                        <h5>receipt</h5>
                        <p>{mpesaReceipt}</p>
                        </div>
                        <div className="user">
                        <h5>user</h5>
                        {/* <Link to={`/admin/view-user/${_id}`}>
                        <p>view user</p>
                        </Link> */}
                        </div>
                        <div className="order">
                        <h5>order</h5>
                        <Link to={`/admin/view-user-order/${order}`}>
                             <p>view order</p>
                         </Link>
                        </div>
                        <div className="delete">
                            <h5>delete</h5>
                            <FaTrash  onClick={()=>delete_Payment(_id)}/>
                        </div>
                    </div>
               </div>
                )
               })}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    min-height:50vh;
    position:relative;
    background: var(--clr-white);
    box-shadow: var(--dark-shadow);
    padding: 1rem 0;


    .loading{
position:absolute;
left:50%;
bottom:0;
transform:translateX(-50%);
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items:center;

svg{
    font-size:2rem;
}
}

.delete{
    svg{
        color:red;
        cursor:pointer;
        margin:0;
        font-size:1rem;
    }
}

.error{
    flex-direction:column;
    padding:0 2rem;
    text-align:center;
    color: red;
    .btn{
        background: var(--clr-green-dark);
        color: var(--clr-black);
    }
}
    .container{
        display:flex;
        flex-direction:column;
        .title{
            text-align:center;
            color: var(--clr-grey);
            font-weight:bold;
        }
    }
    .center{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        text-align:center;
        margin:1rem 0;
        h5{
            font-weight:bold;
        }
        p{
            color: var(--clr-green-dark);
        }
    }
`

export default SinglePayment
