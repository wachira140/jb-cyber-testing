import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai';
import {RiAdminFill} from 'react-icons/ri';
import {MdPayment} from 'react-icons/md';
import {BiStore} from 'react-icons/bi';
import { useProductContext } from '../context/productContext'
import { useOrdersContext } from '../context/ordersContext'
import { useAuthContext } from '../context/authContext';


const Links = () => {
  const { closeSidebar } = useProductContext()
  const { clearPay } = useOrdersContext()
  const { user } = useAuthContext()

    return (
<Wrapper>
    <ul className="sidebar-categories"> 
    <li className="links" onClick={closeSidebar}>
      <Link to='/'>
         <AiFillHome /><span className='category-link'>home</span>
      </Link>
      </li>
    <li className="links" onClick={closeSidebar}>
      <Link to='/ordersAndPayments' onClick={clearPay}>
         <MdPayment /><span className='category-link'>orders</span>
      </Link>
      </li>
    <li className="links" onClick={closeSidebar}>
      <Link to='/products'>
         <BiStore /><span className='category-link'>store</span>
      </Link>
      </li>
      {
        user.role ==='admin' &&
            <li className="links" onClick={closeSidebar}>
              <Link to='/admin'>
                <RiAdminFill /><span className='category-link'>admin</span>
              </Link>
              </li>
     }
      
     </ul>
</Wrapper> 
    )
}

const Wrapper = styled.div`
.links {
  margin-bottom: 1rem;
  color: var(--clr-primary-2);
  cursor: pointer;
  text-transform:capitalize;

  svg{
    color:var(--clr-black);
    font-size:1.45rem;
    border:none;
  }
}
.category-link {
  margin-left: 1rem;
  transition: var(--transition);
  color: #000000;
  letter-spacing: 0.075rem;
  font-size:1.35rem;
}
.category-link:hover {
  color: rgb(16, 171, 243);
}

`

export default Links
