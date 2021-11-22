import React from 'react'
import Product from './Product'

const GridView = ({products}) => {
    return (
        <div>
            <Product product={products} />
        </div>
    )
}

export default GridView
