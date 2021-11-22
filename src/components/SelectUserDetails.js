import React from 'react'
import styled from 'styled-components'
import { useOrdersContext } from '../context/ordersContext'
import { pickUp } from '../utils'
import {
    Location,
    MethodHelper
} from './index'

const SelectUserDetails = () => {

    
    const { 
        deliveryDetails,
        delivery_services,
        collect_user_details, 
        cartItems,
    } = useOrdersContext()
    
    const {courier_service, pick_station} = collect_user_details
    
    const station = pickUp(delivery_services, courier_service)
    return (
        <Wrapper>
              <div className="location article">
                    <h5 className="title">select location</h5>
                    <Location />
            </div>

            <div className="method article">
                <h5 className="title">delivery method</h5>
                        { delivery_services && delivery_services.map((method, index)=>{
                             return (
                                 <MethodHelper location ={method} deliveryDetails={deliveryDetails} key={index}/>
                             )
                         }) }
                      
            </div>
                <div className="location article">
                    <h5 className="title">pick up station</h5>
                    <select 
                        className="pickup"
                        name="pick_station"
                        onChange={deliveryDetails}
                        value={pick_station}>
                            
                            {
                              station && station.map((office, index)=>{
                                   return(
                                       <option key={index}>
                                           {office}
                                           </option>
                                   )
                               })
                            }
                    </select>
                </div>
            <div className="article">
                <h5 className="title">Phone number for payment</h5>
                <label htmlFor="phone">+254</label>
                <input 
                    name="phone" 
                    className="phone" 
                    type="text" 
                    disabled={cartItems.length < 1 ? true :false}
                    onChange={deliveryDetails}
                    placeholder="722122122"/>
            </div>
            
        </Wrapper>
    )
}

const Wrapper = styled.section`

`

export default SelectUserDetails
