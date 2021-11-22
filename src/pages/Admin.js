import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { CgMenuGridO } from 'react-icons/cg'
import { useAdminContext } from '../context/adminContext'
import {
    AddProduct,
    Manage,
    AllProducts,
    EditProduct,
    Payments,
    SinglePayment,
    AllOrdersAdmin,
    AdminSingleOrder,
    Users,
    SingleUser,
    NotFound
} from './index'

const Admin = () => {

    const { path, url }=useRouteMatch()

    const {  openSidebar, isSidebarOpen } = useAdminContext()


    return (
        <Wrapper className = 'col-lg-10  mx-auto'>
            <div className="menu"
            onClick = {openSidebar}>
            <CgMenuGridO  className='icon'/>
            </div>
            <div className="container">

                <div className={ isSidebarOpen ? 'sidebar show-sidebar': 'sidebar'}>
                         <Manage  url = {url}/>
                </div>

                <div className="content">
                  <div className="content-center">
                     <Switch>
                <Route  exact path={`${path}/`} component={AllProducts} />
                <Route  exact path={`${path}/add-product`} component={AddProduct} />
                <Route   path={`${path}/edit-item/:id`} component={EditProduct} />
                <Route   path={`${path}/view-payment/:id`} component={SinglePayment} />
                <Route  exact path={`${path}/payments`} component={Payments} />
                <Route  exact path={`${path}/orders`} component={AllOrdersAdmin} />
                <Route   path={`${path}/view-user-order/:id`} component={AdminSingleOrder} />
                <Route  exact path={`${path}/users`} component={Users} />
                <Route  exact path={`${path}/view-user/:id`} component={SingleUser} />
                <Route  exact path={`${path}*`} component={NotFound} />
            </Switch>
                  </div>
                </div>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
overflow:hidden;
.menu{
    margin:1rem 0 0 1rem;
    display:inline-block;
    svg{
        font-size:2rem;
        color: var(--clr-white)
    }
}


@media (max-width: 768px){
//   text-align:center;
    
    .container{
        position:relative;
        margin:1rem 0;
        display:inline-block;
    }
    .sidebar {
        min-height: 100vh;
        width: 200px;
        top: 4rem;
        left: 0;
        background: var(--clr-white);
        box-shadow: var(--dark-shadow);
        border:0.01rem var(--clr-black) solid;
        border-radius: var(--radius);
        position: fixed;
        transition: var(--transition);
        transform: translate(-100%);
        z-index: 99;
    }
    .show-sidebar {
        transform: translate(0);
    }
   
    
}
    
    @media (min-width: 768px){
        text-align:center;

        margin-top: 1rem;
        .menu{
            display:none;
        }
        .container{
        display:grid;
        grid-template-columns:200px auto;
        column-gap: 2rem;
        margin:1.25rem 0;
        }

        .sidebar{
        min-height:50vh;
        top:1rem;
        position: sticky;
         background: var(--clr-white);
        box-shadow: var(--dark-shadow);
        border-radius: var(--radius);
        }
}

`

export default Admin

