import React from 'react'
import styled from 'styled-components'
import defaultImage from '../images/image1.png'
import image1 from '../images/image1.png'
import image2 from '../images/image3.png'

const PromotionalBanner = ({ bannerleft, bannerright}) => {
    return (
        <Wrapper>
           
        <header className='default-hero'>
             <div className="banner left">
                <img src={bannerleft ? bannerleft : image1} alt='banner' />
            </div>
            <div className="banner right">
                <img src={bannerright ? bannerright :image2} alt='banner' />
            </div>
        </header>
            
        </Wrapper>
    )
}

// Hero.defaultProps ={
//     hero:'default-hero'
// }

const Wrapper = styled.section`
    height:120px;
    width:100%;
    margin:0.75rem 0;

    .default-hero {
      display: flex;
      gap:0.45rem;
      align-items: center;
      justify-content: center;
      background:var(--clr-white);
    //   background:url(${defaultImage});
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      margin: auto;
      padding:0.25rem;
      height: 100%;
      width: 100%;
      box-shadow: var(--light-shadow);
      overflow:hidden;
    }

    .banner{
        width:50%;
        height:100%;
        background:var(--clr-orange);
        border-radius:5px;
        display:flex;
        justify-content:center;
        // padding:0.25rem 0;
    }
    .banner img{
    height:100%;
    width:100%;
     background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
}
@media (min-width: 976px){
    height:220px;
}
@media (min-width: 1220px){
    height:250px;
}

`

export default PromotionalBanner
