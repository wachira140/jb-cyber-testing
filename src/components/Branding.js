import React,{ useEffect } from 'react'
import ProductList from './ProductList'
import { useProductContext } from '../context/productContext'
import { useFilterContext } from '../context/filterContext'

const Branding = () => {
    const { branding } = useProductContext()
    const { filterCategory } = useFilterContext()
    
    useEffect(() => {
      
        filterCategory("category",'branding')
        // eslint-disable-next-line 
    }, [])
    return (
        <div>
            <ProductList
              products={branding.slice(0,4)} 
              title='our branding'
               subtitle ={branding.length >=4 && 'see all'}
               linkto='branding'
               name='category'
               filterBy='branding'
                />
        </div>
    )
}

export default Branding 
