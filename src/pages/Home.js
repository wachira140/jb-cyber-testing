import React from 'react'
import styled from 'styled-components'
import {useProductContext} from '../context/productContext'
import PromotionalBanner from '../components/PromotionalBanner'
import Hero from '../components/Hero'
import NavigationBar from '../components/NavigationBar'
import image1 from '../images/banner2.jpg'
import Featured from '../components/Featured'
import { Branding ,
            Store,
            Loading,
            Error,
            } from '../components/index'

const Home = () => {
    const { isLoading, isError } = useProductContext()

    if(isLoading){
        return (
            <Loading />
        )
    }
    if(isError){
        return (
            <Error />
        )
    }
    return (
        <Wrapper>
                <main className=' col-md-10 col-lg-10 mx-auto'>
                <div className="header">
                     <Hero image={image1}/>
                </div>
                <div className="navigationbar">
                     <NavigationBar />
                </div>
            <Featured />
            <PromotionalBanner />
            <Branding />
            <Store />
        </main>
            </Wrapper>
           
    )
}

const Wrapper = styled.header`
// background: var(--clr-grey-1);
.navigationbar{
    display:none
}
@media (min-width: 576px){
    padding:0;
   .navigationbar{
    display:block;
}
.header{
    display:none;
}
}
`

export default Home
