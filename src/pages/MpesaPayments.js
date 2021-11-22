import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {useOrdersContext} from '../context/ordersContext'
import {
    AuthLoading
} from "../components"


const MpesaPayments = () => {

    const {
         payWithMpesa, 
         getNumber,
          mobileNumber ,
          mpesa,
          clearPay,
        } = useOrdersContext()

        
        const history = useHistory()
        
        useEffect(()=>{
            if(mpesa.success){

                setTimeout(()=>{
                       clearPay()
                       history.push('/cart')
                   },3000)
            }
            // eslint-disable-next-line 
        },[mpesa.success])
        
        
      


            if(mpesa.success){
              
            }

    return (
        <Wrapper>
            <div className='container'>
                { mpesa.load &&
                <div className="loading">
                        <AuthLoading />
                    </div>}

                { mpesa.error &&
                <div className="loading column">
                        <h5>{mpesa.msg}</h5>
                        <p 
                        className='btn'
                        onClick={clearPay}>reset</p>
                    </div>}

                    {
                        mpesa.success &&
                        <div className="loading column">
                            <h5>success</h5>
                            <p>{mpesa.msg}</p>
                        </div>
                    }

                <h5>enter your mpesa number here</h5>
                <div className='input my-4'>
                    +254
                <input type="text"
                placeholder='712121212'
                value={mobileNumber}
                onChange={getNumber}/>
                </div>
                <div>
                <button 
                className='btn' 
                type='button'
                onClick={payWithMpesa}>pay</button>
                </div>
                <h5 className = 'disclaimer mt-4'>Note<span>all transactions are handled by mpesa service. <br/>
                we do not collect your data.</span></h5>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.article`
background: var(--clr-grey-10);
display:flex;
text-align:center;
align-items:center;
padding: 2rem 1rem;

.container{
    background: var(--clr-white);
    padding:2rem 0;
    border:1px var(--clr-green-dark) solid;
    border-radius: var(--radius);
    position:relative;
   
}

input{
    width: 220px;
    margin-left: 1rem;
    padding: 0.25rem 1rem;
    letter-spacing: var(--spacing);
}
.disclaimer{
    display:flex;
    flex-direction:column;
    color: var(--clr-green-light);
    padding: 0 1rem;
    line-height: var(--height)
}
.btn{
    background: var(--clr-green-dark);
    color: var(--clr-black);
    font-weight:bold;
}

.loading{
position:absolute;
background:rgba(255, 255, 255, 0.452);
left:50%;
bottom:0;
transform:translateX(-50%);
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items:center;
}

.column{
    flex-direction:column;
    background:rgba(255, 255, 255, 0.852);
}

.initial-loading{
background: var(--clr-grey-10);
display:flex;
flex-direction:column;
text-align:center;
align-items:center;
padding: 2rem 1rem;
}


`

export default MpesaPayments
