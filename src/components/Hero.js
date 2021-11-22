import React from 'react'
import styled from 'styled-components'
import image2 from '../images/image1.png'

const Banner = ({image}) => {
    return (
        <Wrapper>
           <div className="hero-container ">
               <div className="img-container col-md-4">
                   <img src={image ? image :image2} alt="hero" className='img-fluid' />
               </div>
           </div>
        </Wrapper>
    )
}

const Wrapper = styled.article`
.hero-container{
    height:180px;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0.5rem 0.5rem ;
    overflow:hidden;
    margin-bottom: 0.25rem;
    background:var(--clr-white);
}
.img-container{
    height:100%;
    width:100%;
     display:flex;
    justify-content:center;
    align-items:center;
    background:var(--clr-orange);
     border-radius:5px;
}
img{
    height:100%;
    width:100%;
    border-radius:5px;
}

@media (min-width: 576px){
    .hero-container{
        height:220px;
    }
}


@media (min-width: 776px){
    .hero-container{
        height:260px;
        border-radius:5px;
    }
}

@media (min-width: 992px){
    .hero-container{
        height:300px;
        border-radius:5px;
    }
}


`

export default Banner
