import React, {useEffect} from 'react'
import ProductList from './ProductList'
import { useProductContext } from '../context/productContext'
import { useFilterContext } from '../context/filterContext'

const Store = () => {
    const {products} = useProductContext()
     const { filterCategory } = useFilterContext()
     
    useEffect(() => {
      
        filterCategory("category",'all')
        // eslint-disable-next-line 
    }, [])
    return (
        <div>
            <ProductList 
                products={products.slice(0,4)}
                    title='our store'
                        subtitle='see all'
                            linkto='products'/>
        </div>
    )
}

export default Store
