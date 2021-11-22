import React from 'react'
import styled from 'styled-components'
import { FaFacebookF, FaWhatsapp, FaPhone } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'


const Footer = () => {
    return (
        <Wrapper>
            <div className='footer d-flex p-2 '>
                <div className="location"> 
                <h5>we are located at</h5>
                <ul>
                    <li>Kahawa sukari.</li>
                    <li>baringo road.</li>
                    <li>executive business center.</li>
                </ul>
                </div>
                <div className="contact">
                    <h5><span className='p-2'> <FaPhone /></span>call us on</h5>
                    <ul>
                        <li className='anchor'>
                            <a href="tel:+254729525887">+254729525887</a>
                        </li>
                        <li className='anchor'>
                            <a href="tel:+254729525887">+254729525887</a>
                        </li>
                        <li className='anchor'>
                            <a href="tel:+254703547065">+254703547065</a>
                        </li>
                        
                    </ul>
                </div>
                <div className="social">
                    <h5>connect with us on</h5>
                    <ul>
                        <li className='d-flex'> <span className='icon'><FaFacebookF /></span>jbcyberworld</li>
                        <li className='d-flex'> <span className='icon'><FaWhatsapp /></span>0729876566</li>
                        <li className='d-flex anchor'> <span className='icon'><AiOutlineMail /></span><a href="mailto:jbcyber2021@gmail.com">jbcyber2021@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div className="developer">
                <a href="mailto:wachiraw424@gmail.com">
                <p>page developed and maintained by <span>spec-Techs ltd</span></p>
                </a>
            </div>
                <div className="business"> @copyright {
                    new Date().getFullYear()
                }. all rights reserved.</div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
background: var(--clr-black);
color: var(--clr-white);

.footer{
    flex-wrap:wrap;
    justify-content:space-between;
    align-items:center;
    .location{
        p{
            color: var(--clr-white);
        }
    }
    div{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    div>h5{
        font-size:1.25rem;
    }
    div>ul>li{
        font-size:1rem;
        letter-spacing: var(--spacing);
        margin-bottom:0.25rem;
    }
}
.social ul li{
    align-items:Center;
    gap:1rem;
    :hover{
        cursor:pointer;
        color: var(--clr-grey-5);
    }
    span{
        font-size:1.55rem;
    }
}

.anchor a{
    color: var(--clr-white);
}
.anchor a:hover{
    color: var(--clr-grey-5);
}


.business{
    display:flex;
    justify-content:center;
    font-size:1rem;
    padding-bottom:2rem;
}
.developer{
    margin: 1rem 0;
    display:flex;
    justify-content:center;
    p{
        margin:0;
        padding: 1rem;
        letter-spacing: var(--spacing);
        font-size:1rem;
        color: var(--clr-white);
        text-transform: capitalize;
    }
    p, :hover{
        color: var(--clr-grey-5);
    }
}


`

export default Footer
