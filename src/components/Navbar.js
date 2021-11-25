import React, {useRef, useEffect} from 'react';
import styled from 'styled-components'
import { Link,  useLocation } from 'react-router-dom'
import {FaBars, FaShoppingCart} from 'react-icons/fa';
import {MdAccountCircle} from 'react-icons/md';
import { CgMenuGridO } from 'react-icons/cg'
import { useProductContext } from '../context/productContext';
import { useFilterContext } from '../context/filterContext';
import { useAuthContext } from '../context/authContext'
import { useCartContext } from '../context/cartContext'
import { SubMenu} from './index'

const Navbar = () => {

    const {
         openSidebar,
          displaySubMenu,
           openSubMenu,
           closeSubMenu ,
           isLocation 
        } = useProductContext()


        const {
            cart_Items
        } = useCartContext()

    const { 
        updateFilter,
         text 
        } = useFilterContext()


    const {
         logOut, 
          login_Success
         }  = useAuthContext()

    
    const location = useLocation()
    
    
    const container = useRef(null)



useEffect(() => {
   const submenu = container.current

    const { center, bottom } =  isLocation

   submenu.style.left=`${center}px`
   submenu.style.top=`${bottom}px`
}, [isLocation])


 

    return (
        <Wrapper>

            <div
                className={openSubMenu ? 'submenu show' : 'submenu'}
                ref={container}
                onMouseLeave={closeSubMenu}>
                    <SubMenu />
                </div>

            <div className="nav-container d-flex" onMouseOver={closeSubMenu}>
                

                <div className="nav-left center d-flex">
                    <div className="icon nav-icon" onClick={openSidebar}>
                        <FaBars />
                    </div>
                    <div className="logo">
                        <Link to='/'>
                        <h3>jbc</h3>
                        </Link>
                    </div>
                     <div 
                        className={location.pathname === '/' ? 'menu' :'menu display'}
                         onMouseOver= {displaySubMenu}>
                        <CgMenuGridO className='menu-icon'/>
                    </div>
                </div>

                <div className="nav-center">
                    <div className="search-form d-flex">
                    <Link to='/products'>
                        <input
                         type="text"
                        name="text"
                        value={text}
                        onChange={updateFilter}
                        className='search-input'
                        placeholder='enter your search' />
                        </Link>
                    </div>
                </div>

                <div className="nav-right center d-flex">
                    
                    { login_Success ?
                        <div 
                        className=" nav-icon icon logedin"
                        onClick={logOut}>
                            <MdAccountCircle/>
                            <span>logout</span>
                        </div>  : 
                        !login_Success && <Link to='/login'> <div className=" nav-icon icon logedout ">
                            <MdAccountCircle/>
                            <span>login</span>
                        </div>
                         </Link>
                       }
                    
                        <div className=" nav-icon icon " >
                            <Link to='/cart' className='cart'>
                                <FaShoppingCart />
                                <span>cart</span>
                                <p className='cart-amount'>{cart_Items.length}</p>
                                </Link>
                        </div>
                </div>
            </div>
            
        </Wrapper>
    )
}

const Wrapper = styled.nav`
// position: fixed;
top:0;
left:0;
right:0;
width:100%;
display:block;
z-index:100;
box-shadow: var(--dark-shadow);
margin:0 auto;


.nav-container {
  justify-content: space-between;
  align-items: center;
  background: var(--clr-white);
  width: 100%;
  padding: 0.75rem 0.25rem;
  z-index: 10;
}



.submenu{
background: var(--clr-white);
  box-shadow: var(--dark-shadow);
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: none;
  padding: 2rem;
  border-radius: var(--radius);
  transition: var(--transition);
}
.submenu::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--clr-white);
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.show{
    display:block;
}


.center {
  gap: 0.75rem;
  align-items: center;
  text-align:center;
}
.logo h3 {
  margin: 0;
//   margin-right:0.25rem;
  padding: 0;
  line-height: normal;
  color: var(--clr-orange);
  font-size:1.25rem;
  font-weight: 400;
}
.nav-right {
  gap: 0.75rem;
  margin-right:0.5rem;
}
.search-form {
  justify-content: center;
  gap: 0.15rem;
}
.search-input {
  padding: 0.25rem;
  padding-left: 1rem;
  background: var(--clr-grey-9);
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  font-size: 0.85rem;
  flex: 1 0 auto;
  color: var(--clr-grey-1);
  width:180px;
}
.search-icon {
  font-size: 1.25rem;
}

.icon{
    svg{
        font-size:1.5rem;
    }
}

.menu{
  display:none;
font-size:1.5rem;
cursor:pointer;
}


.cart{
  color: var(--clr-primary-3);
  position:relative;
}

.cart-amount{
    position:absolute;
    top:-7px;
    left:0;
    transform: translateX(100%);
    color: var(--clr-orange);
}

.cart-amount::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--clr-white);
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.nav-right .nav-icon{
     color: var(--clr-primary-1); 
     align-items:center;
}

.nav-right .nav-icon span{
    // display:none
    font-size:0.85rem
}

.logedin{
    svg{
        color:var(--clr-green-dark);
    }
    span{
        color: var(--clr-red-dark);
    }
}
.logedout{
    svg{
        color: var(--clr-red-dark);
    }
    span{
        color:var(--clr-green-dark);
    }
}




@media (min-width: 576px){

     .nav-left .icon{
        display:none;
    }
    .nav-right{
        gap:3rem;
    }
    .search-form{
        gap:0.75rem;
    }
    .search-input{
        width:250px;
    }
    .nav-icon{
      font-size:1.35rem;
      display:flex;
      flex-direction:column;
      text-align:center;
    }

.nav-right .nav-icon span{
     font-size:1rem;
     display:block;
     font-weight:bold;
}
.display{
    display:block;
    svg{
        height:30px;
        width:70px;
    }
}

}

@media (min-width: 776px){
    .nav-right{
        justify-content:space-between;
        margin-right:1.5rem;
    }
    .search-form{
        gap:1.5rem;
    }
    .search-input{
        width:300px;
    }
    .nav-icon{
        font-size:1.55rem;
    }
    .nav-left{
        margin-left:2rem;
    }
    .logo h3{
        font-size:1.85rem;
        text-transform:uppercase;
    }
  
}

@media (min-width: 992px){

    .search-input{
        width:460px;
    }
    .nav-right{
        margin-right:5rem;
    }
    .nav-right .nav-icon{
        display:flex;
        gap:0.35rem;
        svg{
            font-size:2rem;
        }
    }

.nav-right .nav-icon span{
     font-size:1rem;
     display:block;
}
}

@media (min-width: 1220){
    .nav-icon{
       svg{

            font-size:2rem
        }
    }
}

`

export default Navbar
