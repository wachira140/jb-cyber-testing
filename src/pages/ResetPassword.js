import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineLogin } from 'react-icons/ai'
import { useAuthContext } from '../context/authContext'
import { AuthLoading } from '../components/index'

const ResetPassword = () => {

const { 
    resetPassword, 
    resetPasswordEmail, 
    reset,
    resetForgotDetails,
} = useAuthContext()

const { msg, email, loading, error, success } = reset

    return (
        <Wrapper>
            <div className={ success ? "login-container on-success" : "login-container"}>

                {loading && <div className='loading'>
                    <AuthLoading />
                    </div>}
                {success && <div className='loading success'>
                    <h5>{msg}</h5>
                    </div>}
                {error && <div className='loading error'>
                    <h5>{msg}</h5>
                    <p className='btn' onClick={resetForgotDetails}>try again</p>
                    </div>}

                <div className="login-image">
                    <div className="login-icon">
                        <AiOutlineLogin  className="icon"/>
                    </div>
                    <h4>reset password</h4>
                </div>
                <form >
                    <div className="email login">
                        <input 
                        type="text"
                        name="email"
                        value={email}
                        onChange={resetPasswordEmail }
                        placeholder="enter@email.com" />
                    </div>
                    <button 
                    className="btn"
                    onClick={ resetPassword}>send email</button>
                </form>
                <p>
                    Already have an account ?
                    <Link to='/login' className='login-link'>login</Link>
                </p>
              
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin:3rem auto;
    width:100%; 
    display:flex;
    justify-content:center;
    align-items:center; 
   
    .login-container{
        position:relative;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width:300px;
        padding: 1rem 0.5rem;
        background: var(--clr-white);
        border-radius: var(--radius);
        border: 0.05rem var(--clr-orange) solid;
    } 

    .on-success{
        border: 0.05rem var(--clr-green-dark) solid;
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
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }

  

     .login-image{
       display:flex;
       flex-direction:column;
       justify-content:center;
       align-items:center;
       color: var(--clr-purple);
    }
     .login-icon{
        background: var(--clr-purple);
        width:50px;
        height:50px;
        padding:1rem;
        border-radius:50%;
         display:flex;
        justify-content:center;
        align-items:center;
        
        .icon{
            font-size:1rem;
            color: var(--clr-orange);
        }
    } 
    form{
        display:flex;
        margin-top:0.5rem;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .login{
        margin-bottom:1rem;
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
    p {
    margin: 0;
    margin-top: 1rem;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--clr-blue);
    cursor: pointer;
  }

    .error{
        background:rgba(255, 255, 255, 0.85);
    }
    .error .btn{
        padding: 0.15rem 0.2rem;
        background: var(--clr-green-dark);
        color: var(--clr-white);
    }
    .success{
        background:rgba(255, 255, 255, 0.9);
        color: var(--clr-green-dark);
        padding: 0 0.5rem;
        text-align:center;
    }
   
`

export default ResetPassword
