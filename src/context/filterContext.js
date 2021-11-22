import React, {useContext, useReducer, useEffect, } from "react";
import reducer from "../reducer/filterReducer";
import { useProductContext } from "./productContext";

import {
 SET_GRIDVIEW,
 SET_LISTVIEW,
 UPDATE_SORT,
 LOAD_PRODUCTS,
 SORT_PRODUCTS,
 UPDATE_FILTER,
 FILTER_PRODUCTS,
 CLEAR_FILTERS,
 FILTER_BY_CATEGORY_PASSED,
} from '../actions'


const initialState = {
  grid_View:true,
  filteredProducts:[],
  all_Products:[],
  sort:"price-lowest",
  filters:{
    text:'',
    category:'all',
    brand:'all',
    min_Price:0,
    max_Price:0,
    price:0,
  },
}


const filterContext = React.createContext()


export const FilterProvider = ({children})=>{
    const {products} = useProductContext()
 const [state, dispatch] = useReducer(reducer, initialState)

 useEffect(() => {
    dispatch({type:LOAD_PRODUCTS, payload:products})
 }, [products])



useEffect(() => {
    dispatch({type:FILTER_PRODUCTS})
    dispatch({type:SORT_PRODUCTS})
}, [products, state.sort, state.filters])

 

const setGridView = ()=>{
    dispatch({type:SET_GRIDVIEW})
}
const setListView = ()=>{
    dispatch({type:SET_LISTVIEW})
}

const updateSort = (e)=>{
     const value = e.target.value;
    dispatch({type:UPDATE_SORT, payload:value})
 }

 const updateFilter = (e)=>{
     let name = e.target.name
     let value = e.target.value.toLowerCase()
    if(name === 'category'){
        value = e.target.textContent
    }

    if(name === 'price'){
        value = Number(value)
    }
    dispatch({type:UPDATE_FILTER, payload:{name, value}})
 }

 const clearFilters = ()=>{
     dispatch({type:CLEAR_FILTERS})
 }



 const filterCategory = (name, value)=>{
    dispatch({type:FILTER_BY_CATEGORY_PASSED, payload:{ name, value}})
 }

    return (
        <filterContext.Provider value={{
                ...state,
                setGridView,
                setListView,
                updateSort,
                updateFilter,
                clearFilters,
                filterCategory,

        }}>{children}</filterContext.Provider>
    )
}
export const useFilterContext = () => {
  return useContext(filterContext)
}