import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {useFilterContext}from '../context/filterContext'

const SectionTitle = ({
    title, 
    subtitle,
     filterBy,
     linkto,
     children, 
     name
    }) => {

    const { updateFilter} = useFilterContext()



    return (
            

        <Wrapper className='section-title'>
            <h5>{title}</h5>

            { filterBy ? 
            <Link to='/products'>
            <button name={name}
                 className = 'filterby'
                 onClick= {updateFilter}>
                      {linkto}
                     </button> </Link> : <Link to={linkto ? linkto : '/'}>
            <p>{subtitle}</p>
            </Link> }
            
            
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(191, 233, 252);
  padding: 0.35rem 1rem;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.75rem;
  width:100%;

h5 {
    margin: 0;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: normal;
    font-family: Georgia, "Times New Roman", Times, serif;
}
 p {
  margin: 0;
  cursor:pointer;
}

.filterby{
    background:none;
    border:none;
    font-weight:bold;
}
`

export default SectionTitle
