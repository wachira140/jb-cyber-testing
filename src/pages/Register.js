import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AiOutlineLogin } from 'react-icons/ai'
import { useAuthContext } from '../context/authContext'
import { AuthLoading } from '../components/index'

const Register = () => {
    const {
         fetchRegisterDetails, 
        registerUser,
        register,
          auth_Loading,
          isError,
          isSuccess,
          resetDetails,
        } = useAuthContext()


        const { name, email, password } = register



    return (
        <Wrapper>
            <div className="login-container">
                {auth_Loading && 
                    <div className="auth-infor">
                        <AuthLoading />
                    </div>
                }
                {isSuccess.success && 
                 <div className="auth-infor response success">
                       <h5>{isSuccess.msg}</h5>
                       <Link to='/login'>
                       <button type="button" className="btn" onClick={ resetDetails}>go to login</button>
                    </Link>
                    </div>
                }
                {isError&& 
                 <div className="auth-infor  response error">
                       <h5>Error occured. Please try again</h5>
                       <button type="button" className="btn" onClick={resetDetails}>back to register</button>
                    </div>
                }
                <div className="login-image">
                    <div className="login-icon">
                        <AiOutlineLogin  className="icon"/>
                    </div>
                    <h4>register account</h4>
                </div>
                <form >
                    <div className="name login">
                        <input 
                        type="text"
                        name="name"
                        onChange={fetchRegisterDetails }
                        value={name}
                        placeholder="enter your name" />
                    </div>
                    <div className="email login">
                        <input 
                        type="text"
                        name="email"
                        onChange={fetchRegisterDetails }
                        value={email}
                        placeholder="enter@email.com" />
                    </div>
                    <div className="password login">
                        <input
                         type="password" 
                         name="password"
                         onChange={fetchRegisterDetails }
                        value={password}
                         placeholder="enter password"/>
                    </div>
                    <button
                    //  type="submit" 
                     className="btn"
                     onClick={registerUser}
                    >Register</button>
                </form>
                <div className="sign-up">
                    <p > Have an account ? <span>
                        <Link to='/login' className="link">
                            Login here
                        </Link>
                        </span></p>
                </div>
                
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin: 1.25rem auto;
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
        width:280px;
        padding: 1.5rem 1rem;
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
            padding:0.25rem 0.75rem;
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
        font-size:1rem;
    }
    .link{
        color: var(--clr-blue);  
    }
    .link:hover{
        cursor:pointer;
    }


    .auth-infor{
        position:absolute;
        background:rgba(255, 255, 255, 0.452);
        left:50%;
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
    .success .btn{
        color:var(--clr-white);
        background: var(--clr-green-dark);
    }

    .error{
        color: var(--clr-red-dark)
    }

    .error .btn{
        background: var(--clr-green-dark);
        color: var(--clr-white);
    }
    
`

export default Register
