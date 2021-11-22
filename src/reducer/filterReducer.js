import {
SET_GRIDVIEW,
SET_LISTVIEW,
LOAD_PRODUCTS,
UPDATE_SORT,
SORT_PRODUCTS,
UPDATE_FILTER,
FILTER_PRODUCTS,
CLEAR_FILTERS,
FILTER_BY_CATEGORY_PASSED,
} from '../actions'

 const filter_reducer = (state, action)=>{

    if(action.type === LOAD_PRODUCTS){

        let maxPrice = action.payload.map(product=>product.price)
         maxPrice = Math.max(...maxPrice)
        
        return {
            ...state,
            all_Products:[...action.payload],
            filteredProducts:[...action.payload],
            filters:{
                ...state.filters,
                max_Price:maxPrice,
                price:maxPrice
            }
        }
    }


    if(action.type === SET_GRIDVIEW){
        return {
            ...state,
            grid_View:true,
        }
    }
    if(action.type === SET_LISTVIEW){
        return {
            ...state,
            grid_View:false,
        }
    }


        if(action.type === UPDATE_FILTER){
        const { name, value } = action.payload
        return {
            ...state,
            filters:{
                ...state.filters,
                [name]:value }
        }
    }



if(action.type === FILTER_PRODUCTS){
    const { all_Products } = state
    const { category, brand, price, text } = state.filters 
    let filteredProducts = [...all_Products]
if(text){
    filteredProducts = filteredProducts.filter((product)=>{
        return product.name.toLowerCase().startsWith(text)
    })
}
    
if(category !== 'all'){
     filteredProducts = filteredProducts.filter((product)=>product.category.toLowerCase() ===category)
}
if(brand !== 'all'){
     filteredProducts = filteredProducts.filter((product)=>product.brand.toLowerCase() ===brand)
}
    
filteredProducts = filteredProducts.filter((product)=>product.price <= price)
return {
    ...state,
  filteredProducts
}

}

if(action.type === CLEAR_FILTERS){
    const { max_Price } = state.filters
    return{
        ...state,
        filters:{
            ...state.filters,
            category:'all',
            brand:"all",
            text:'',
            price:max_Price
        }
    }
}



 if(action.type === UPDATE_SORT){
        return {
            ...state,
            sort:action.payload
        }
    }



    if(action.type === SORT_PRODUCTS){
        const { sort, filteredProducts } = state
        let tempProducts = [...filteredProducts]
        if(sort === "price-lowest"){
            tempProducts = tempProducts.sort((a,b)=>
                a.price - b.price)
        }

        if(sort === 'price-highest'){
            tempProducts = tempProducts.sort((a,b)=>
                b.price - a.price)
        }

        if(sort === 'name-a'){
            tempProducts = tempProducts.sort((a, b)=>{
                return a.name.localeCompare(b.name)
            })
        }
        if(sort === 'name-z'){
            tempProducts = tempProducts.sort((a, b)=>{
                return b.name.localeCompare(a.name)
            })
        }

        
        return {
            ...state,
            filteredProducts:tempProducts
        }
    }

   if(action.type === FILTER_BY_CATEGORY_PASSED){
       const {name, value} = action.payload
       return {
           ...state,
           filters:{
               ...state.filters,
                    [name]:value,
           }
       }
   }




throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer