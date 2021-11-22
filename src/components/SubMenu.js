import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai';
import {RiAdminFill} from 'react-icons/ri';
import {MdPayment} from 'react-icons/md';
import {BiStore} from 'react-icons/bi';
import styled from 'styled-components'
import { uniqueValue } from '../utils'
import { useFilterContext } from '../context/filterContext'
import { useOrdersContext } from '../context/ordersContext'
import { useAuthContext } from '../context/authContext';

const SubMenu = () => {
    const { all_Products, updateFilter } = useFilterContext()

    const { user } = useAuthContext()
    const { clearPay } = useOrdersContext()

    const categories = uniqueValue(all_Products, 'category')




    return (
        <Wrapper>
            <ul className="pages">
                <li className= 'link'>
                    <Link to='/' className='category-link'>
                        <AiFillHome />
                        <span >Home</span>
                    </Link>
                </li>
                <li className= 'link'>
                    <Link to='/ordersAndPayments' className='category-link' onClick={clearPay}>
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
                { user.role ==='admin' &&
                        <li className= 'link'>
                            <Link to='/admin' className='category-link'>
                                <RiAdminFill />
                                <span >admin</span>
                            </Link>
                        </li>
                }
            </ul>
            <hr />
            <div className="categories">
                <h5>categories</h5>
                <div className="center">
                     {categories.map((c, index)=>{
                                return(
                             <Link to='/products' key={index}>
                            <button className='filterBy'
                             name='category'
                             onClick={updateFilter}>{c}</button>
                            </Link>
                                )
                            })}
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

.pages{
    padding:0 1rem 0;
    text-align:start;
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

.categories{
    h5{
        text-align:center;
        font-size:500;
    }
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


`

export default SubMenu
