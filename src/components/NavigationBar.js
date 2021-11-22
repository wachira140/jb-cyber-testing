import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai';
import {RiAdminFill} from 'react-icons/ri';
import {MdPayment} from 'react-icons/md';
import {BiStore} from 'react-icons/bi';
import image1 from '../images/banner2.jpg'
import { uniqueValue } from '../utils'
import { useFilterContext } from '../context/filterContext'
import { useOrdersContext } from '../context/ordersContext'
import { useAuthContext } from '../context/authContext';


const NavigationBar = () => {


const { all_Products, updateFilter } = useFilterContext()
const { user } = useAuthContext()
const {clearPay} = useOrdersContext()


const categories = uniqueValue(all_Products, 'category')

    return (
        <Wrapper className='section'>
           <div className="nav-container">
               <div className="nav-center d-grid">
               {/* ***********links***************** */}
                   <div className="nav-main-container">
                     <ul className="links-container">
                        <li className= 'link'>
                            <Link to='/' className='category-link'>
                                <AiFillHome />
                                <span >Home</span>
                            </Link>
                        </li>
                        <li className= 'link'>
                            <Link to='/ordersAndPayments'
                             className='category-link'
                             onClick={clearPay}>
                                <MdPayment />
                                <span>orders</span>
                            </Link>
                        </li>
                        <li className= 'link'>
                            <Link to='/products' className='category-link'>
                                <BiStore />
                                <span>Store</span>
                            </Link>
                        </li>
                        {
                          user && user.role ==='admin' &&
                        <li className= 'link'>
                            <Link to='/admin' className='category-link'>
                                <RiAdminFill />
                                <span >admin</span>
                            </Link>
                        </li>
                        }
                 </ul>
                        <hr/>
                    <div className="advert">
                        <h5 className='category-title'>top categories</h5>
                        <div className="categories">
                            {categories.map((c, index)=>{
                                return(
                             <Link to='/products' key={index}>
                            <button className='filterBy'
                             name='category'
                             onClick={updateFilter}>{c}</button>
                            </Link>
                                )
                            }).slice(0,7)}
                        </div>
                    </div>
                   </div>
                   {/* *************links end**************** */}
                   
                   {/* *************hero**************** */}
                   <div className="hero">
                       <div className="img-container">
                     <img src={image1} alt="hero banner" className='img-fluid'/>

                       </div>
                   </div>
               </div>
           </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

@media (min-width: 576px){
   
    .nav-container{
        border-radius:4px;
        padding:0.25rem 0.75rem;
    }
    .nav-center{
        grid-template-columns:2fr 4fr;
        grid-gap:0.75rem;
    }

    .nav-main-container{
        display:block;
       background:var(--clr-white);
       box-shadow: var(--dark-shadow);
       border-radius:5px;
       padding:0.25rem 0 0 0.25rem;

    }
    .links-container{
        margin:0;
        padding:0.25rem;

    }
  
    li{

        margin-bottom: 0.5rem;
    }

    li{
    font-size:1rem;
    margin-bottom:0.5rem;
    font-weight:500;
    text-transform:capitalize;
    svg{
        font-size:1.15rem;
    }
    .category-link:hover{
        color: var(--clr-orange);
        transition: var(--transition);
    }

    span{
        margin-left: 1rem;
    }
}

.category-title{
    font-weight:bold;
}

.filterBy{
    display:block;
    background:none;
    border:none;
    font-size:0.85rem;
    text-transform: capitalize;
    cursor:pointer;
    margin-left:1rem;
    margin-bottom:0.25rem;
}
.filterBy:hover{
    color: var(--clr-orange);
    transition: var(--transition)
}
.hero{
    height:360px;
    background:var(--clr-orange);
     box-shadow: var(--dark-shadow);
    
}
.img-container{
   height:100%;
    width:100%;
}
.hero img{
   height:100%;
    width:100%;
    border-radius:4px;
}
  @media (min-width: 768px) {
    .nav-center {
      grid-template-columns: 240px 1fr;
    }
  }


`

export default NavigationBar
