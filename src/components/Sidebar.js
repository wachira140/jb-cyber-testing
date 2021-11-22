import React from 'react';
import styled from 'styled-components'
import {ImCross} from 'react-icons/im';
import Links from './Links'
import { useProductContext } from '../context/productContext';

const Sidebar =() => {
const { isSidebarOpen, closeSidebar, } = useProductContext()
    return (
        <Wrapper>
            <div className= { `${isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}`}>
                    
                <div className="sidebar-top d-flex">
                    <div className="logo">
                        <h3>jbc</h3>
                    </div>
                    <button className="icon close-btn" onClick={closeSidebar}><ImCross/></button>
                </div>
                <div className="categories-container">
                    <h4 className='category-title'>our categories</h4>

                       <Links />
                        
                </div>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.main`
.sidebar-container {
  min-height: 100vh;
  width: 95vw;
  top: 0;
  left: 0;
  background: var(--clr-grey-9);
  box-shadow: var(--dark-shadow);
  position: fixed;
  transition: var(--transition);
  transform: translate(-100%);
  z-index: 999;
}
.show-sidebar {
  transform: translate(0);
}
.sidebar-top {
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px var(--clr-grey-7) solid;
}
.close-btn {
  font-weight: 100;
  color: var(--clr-grey-1);
}
.categories-container {
  margin: 1rem 0 0 1rem;
  border-bottom: 1px var(--clr-grey-7) solid;
}
.category-title {
  text-transform: capitalize;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--clr-orange);
}


`

export default Sidebar
