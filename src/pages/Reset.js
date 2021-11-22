import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import styled from 'styled-components'
import { AuthLoading } from '../components/index'
import { useAuthContext } from '../context/authContext'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Reset = () => {
   
    const history = useHistory()
    const { 
        resetP, 
        handleChange,
         newPassword,
         password,
         clearResetDetails,
        } = useAuthContext()

        const { 
            loading,
             success,
              error, 
              msg 
            } = newPassword


    const query = useQuery();

    

if(success){
    setTimeout(()=>{
        history.push('/login')
    },3000)
}


    return (
        <Wrapper>
            <div className="container">
                  {loading && 
                    <div className="auth-infor">
                        <AuthLoading />
                    </div>
                  }
                  {success && 
                    <div className="auth-infor success response">
                       <h5>{msg}</h5>
                       <h5>redirecting to login...</h5>
                    </div>
                  }
                   {error&& 
                 <div className="auth-infor  response error">
                       <h5>{msg}</h5>
                       <button 
                       type="button" 
                       className="btn"
                       onClick={clearResetDetails}>try again</button>
                    </div>
                }
               
                    <h4>reset password</h4>
               
                <form >
        
                    <div className="password login">
                        <input
                         type="password" 
                         name="password"
                         onChange={handleChange}
                         value={password}
                         placeholder="enter new password"/>
                    </div>
                </form>
                    <button 
                    className="btn"
                    onClick={()=>resetP(query)} >
                        reset
                    </button>
               
                
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    height:100vh;
    width:100%; 
    display:flex;
    justify-content:center;
    align-items:center; 
   
    .container{
        position:relative;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width:300px;
        padding: 1.5rem 0.35rem;
        background: var(--clr-white);
        border-radius: var(--radius);
        border: 0.05rem var(--clr-orange) solid;
    } 
    
    
    } 
    form{
        display:flex;
        margin-top:1rem;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .login{
        margin-bottom:1.5rem;
        input{
            width:220px;
            padding:0.25rem 1rem;
            border-radius: var(--radius);
            border: 0.05rem var(--clr-black) solid;
            color: var(--clr-black);
        }
    }
    .btn{
        width:180px;
        background: var(--clr-orange);
        color: var(--clr-black);
        border-radius: 20rem;

    }
    


      .auth-infor{
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
     .response{
        padding:1rem;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align:center;
        background: rgba(255, 255, 255, 0.85);
    }

   .success{
       color: var(--clr-green-light);
   }

    .error{
        color: var(--clr-red-dark)
    }

    .error .btn{
        background: var(--clr-green-dark);
        color: var(--clr-white);
    }
`

export default Reset
