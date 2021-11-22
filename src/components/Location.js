import React from 'react'
import styled from 'styled-components'
import { locations } from '../locations'
import { useOrdersContext } from '../context/ordersContext'

const Location = () => {

    const { chooseLocation , collect_user_details,  cartItems } = useOrdersContext()

    const { location } = collect_user_details

const uniqueValue = locations.map((loc)=>loc) 
const allLocs = ['choose location', ...new Set(uniqueValue)]


    return (
        <Wrapper>
            <article>
                <select
                     name="location"
                     className="location"
                     onChange={chooseLocation }
                     disabled={cartItems.length < 1 ? true :false}
                     value = {location}>
                    { 
                       allLocs.map((loc, index)=>{
                            return (
                            <option  
                            key={index}
                            value ={loc}>
                                {loc}
                            </option>
                            )
                        })
                    }
                </select>
            </article>
        </Wrapper>
    )
}

const Wrapper  = styled.div`

.location{
    border-radius: var(--radius);
    border-color: transparent;
    padding:0.25rem;
    background: var(--clr-grey-10);
}

`

export default Location
