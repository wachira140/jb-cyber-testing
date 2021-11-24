import React from 'react'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineLogin } from 'react-icons/ai'
import { AuthLoading } from '../components/index'
import { useAuthContext } from '../context/authContext'


const Login = () => {

    const { 
        fetchLoginDetails, 
         login,
         load_On_Login, 
        loginUser,
        user,
        isLoginError,
        resetLogin,
     } = useAuthContext()
    const { email, password } = login


if(user.login_Success){
    return <Redirect to ='/' />
}


    return (
        <Wrapper>
            <div className="login-container">
                  {load_On_Login && 
                    <div className="auth-infor">
                        <AuthLoading />
                    </div>
                  }
                   {isLoginError&& 
                 <div className="auth-infor  response error">
                       <h5>Error occured. Please try again</h5>
                       <button type="button" className="btn" onClick={resetLogin}>try again</button>
                    </div>
                }
                <div className="login-image">
                    <div className="login-icon">
                        <AiOutlineLogin  className="icon"/>
                    </div>
                    <h4>login</h4>
                </div>
                <form >
                    <div className="email login">
                        <input 
                        type="text"
                        name="email"
                        onChange={fetchLoginDetails}
                        value={email}
                        autoComplete="off"
                        placeholder="enter@email.com" />
                    </div>
                    <div className="password login">
                        <input
                         type="password" 
                         name="password"
                         onChange={fetchLoginDetails}
                         value={password}
                         autoComplete="off"
                         placeholder="enter password"/>
                    </div>
                    <button 
                    className="btn"
                    onClick={loginUser}>
                        login
                    </button>
                </form>
                <div className="sign-up">
                    <p >Not signed up? <span >
                        <Link to='/register' className='link'>
                            Register here
                        </Link>
                        </span></p>
                </div>
                <div className="reset-password">
                    <Link to='/resetpassword'>
                    <p>forgot password ?</p>
                    </Link>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin: 1rem auto;
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
        padding: 1.5rem 0.35rem;
        background: var(--clr-white);
        border-radius: var(--radius);
        border: 0.05rem var(--clr-orange) solid;
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
    .sign-up{
        display:flex;
        justify-content:space-between;
        margin-top:2rem;
        font-size:0.95rem;
    }
   .link{
        color: var(--clr-blue);  
    }
    .link:hover{
        cursor:pointer;
    }
    .reset-password{
        text-align:center;
        cursor:pointer;
        p{
            color: var(--clr-blue);
            font-size:1rem;
            letter-spacing: var(--spacing);
        }
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
        color:green;
    }

    .error{
        color: var(--clr-red-dark)
    }
    .error .btn{
        background: var(--clr-green-dark);
        color: var(--clr-white);
    }
`

export default Login
