import React from 'react'
import { Redirect } from 'react-router-dom'
import { useOrdersContext } from '../context/ordersContext'
import { useAuthContext } from '../context/authContext'
import styled from "styled-components"
import { formatPrice } from '../utils'
import {
    SelectUserDetails,
    Loading,
    Error,
} from './index'

const CreateOrder = () => {
    
    const {
        subtotal,
        cartItems,
        total_items, 
        collect_user_details, 
        transport_cost,
        submitOrder,
        order_loading,
        order_error,
        success,
    } = useOrdersContext()

    const { user } = useAuthContext()
    
    const {
        courier_service,
        phone,
        location,
        pick_station
    } = collect_user_details


const total = subtotal + transport_cost


    if(order_loading){
        return <Loading />
    }
    if(order_error){
        return <Error />
    }


    if(success){
        return (
            <Wrapper>
                <Redirect to='/paywithmpesa'/>
            </Wrapper>

            )
    }

   
    return (
        <Wrapper>
            <div className="container col-lg-9">
                <SelectUserDetails />
            <div className="article">
                <h5 className="title">confirm your order details</h5>
                <div className="center">
                    <h5 className='true'>
                        name :{user.name}

                    </h5>
                    <h5 className='true'>ordered items : {total_items}</h5>
                    <h5 className={phone ? 'true' : 'false'}>contact: {phone}</h5>
                    <h5 className={location ? 'true' : 'false'}>location: {location}</h5>
                    
                    <h5 className={courier_service ? 'true' : 'false'}>courier: {courier_service}</h5>
                    <h5 className={pick_station ? 'true' : 'false'}>pick up: {pick_station}</h5>
                </div>
            </div>

            <div className=" total">
                <article className="center mb-2">
                    <h5>
                        subtotal : <span>{formatPrice(subtotal)}</span>
                    </h5>
                    <h5>
                        transport : <span>{formatPrice(transport_cost)}</span>
                    </h5>
                    <hr />
                    <h4>total : <span>{formatPrice(total)}</span></h4>
                </article>
            <button 
            type="button" 
            className="btn article"
            disabled={
                cartItems.length < 1 ||
                 !location ||
                 courier_service ==='' ||
                 pick_station ==='' ||
                 phone ===null
                 ? true  :false }
                  onClick={submitOrder}>
                place order
            </button>
            </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

background: var(--clr-grey-9);
padding:1rem 0;
overflow:hidden;
.title{
    font-weight:bold;
    color: var(--clr-orange);
}
.container{
    display:flex;
    flex-direction:column;
    background: var(--clr-white);
    border-radius: var(--radius);
    box-shadow: var(--light-shadow)
}

.article{
    padding: 0.5rem 1rem;
    margin-bottom:1rem;
}

   
.location{
    // display:flex;

    // justify-content:space-between;
    align-items:center;
}
.pickup{
    border-radius: var(--radius);
    border-color: transparent;
    padding:0.25rem;
    background: var(--clr-grey-10);
}
.form-control{
    font-size:0.85rem;
    font-weight:bold;
    line-height:1.1;
    text-transform:capitalize;
    display:grid;
    grid-template-columns: 1rem auto;
    gap: 0.5em;
    letter-spacing: var(--spacing);
    margin-bottom:0.75rem;
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
transform: translateY(-0.075em);
    display: grid;
  place-content: center;
}


.form-control + .form-control {
  margin-top: 1em;
}
input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
   background-color: CanvasText;
}
input[type="radio"]:checked::before {
  transform: scale(1);
}

.phone{
    margin-left:0.5rem;
    background: var(--clr-white);
    border:0.015rem var(--clr-grey) solid;
    padding: 0.1rem 1rem;
    letter-spacing: var(--spacing)
}


.center{
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 2rem 1rem;
    display:grid;
    jsutify-content:center;
}
.total{
    display:grid;
    justify-content:center;
}
h5,
h4{
    display: grid;
    grid-template-columns: 200px 1fr;
}



.true{
    color:green;
}
.false{
    color:red;
}

@media(min-width: 576px){
    .location{
        justify-content:space-around;
    }
    // .total{
    //     justify-content:flex-end;

    // }
}

`

export default CreateOrder
