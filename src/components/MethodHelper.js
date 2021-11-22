import React from 'react'



const MethodHelper = ({location, deliveryDetails}) => {
    

    return (
        <>
                <label className="form-control">
                    <input
                            type="radio" 
                            name="courier_service"
                            onChange={deliveryDetails}
                            value={location.name}/>
                    {location.name}
                </label>
        </>
    )
}

export default MethodHelper
