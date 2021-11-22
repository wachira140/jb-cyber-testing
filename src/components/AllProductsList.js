import React from 'react'
import styled from 'styled-components'
import ListView from './ListView'
import GridView from './GridView'
import { useFilterContext } from '../context/filterContext'

const AllProductsList = () => {
    const { filteredProducts, grid_View }= useFilterContext()

    if(filteredProducts.length < 1){
        return(
            <Wrapper>
            <div className='empty'>
                <h4>no products found</h4>
            </div>
            </Wrapper>
        )
    }

    if(grid_View === false){
        return(
            <Wrapper>
                <ListView products = {filteredProducts}/>
            </Wrapper>
        )
    }
    return (
        <GridView products={filteredProducts}/>
     )
}

const Wrapper = styled.section`
.empty{
    display:flex;
    justify-content:center;
    align-items:center;
    height:50vh;
    background: var(--clr-white);
}
`

export default AllProductsList
