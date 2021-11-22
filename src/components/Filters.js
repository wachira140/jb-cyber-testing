import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filterContext'
import {uniqueValue, formatPrice} from '../utils'



const Filters = () => {
const { all_Products, updateFilter ,filters, clearFilters} = useFilterContext()
const { brand, min_Price,max_Price, price } = filters


const categories = uniqueValue(all_Products, 'category')
const brands = uniqueValue(all_Products, 'brand')

    return (
        <Wrapper>
            <article>
            <form>
                <div className="form-control">
                    <h5>category</h5>
                    <div>
                        {categories.map((category, index)=>{
                            return (
                                <button 
                                type='button'
                                name='category' 
                                onClick={updateFilter}
                                key={index}>
                                  {category}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="form-control">
                    <h5>brands</h5>
                    <div>
                        <select
                         name="brand"
                         className='brand'
                         value={brand}
                         onChange={updateFilter}>
                             {brands.map((brand, index)=>{
                                 return (

                                     <option key={index}>{brand}</option>
                                 )
                             })}
                        </select>
                    </div>
                </div>
                <div className="form-control">
                    <h5>price</h5>
                    <p className="price">{formatPrice(price)}</p>
                    <input type="range"
                    name='price'
                    onChange={updateFilter}
                    value={price}
                    min={min_Price}
                    max={max_Price}
                
                     />
                </div>
            </form>
            <form className='form-control'>
                <button
                 type='button' 
                 className='clearBtn'
                 onClick={clearFilters}>
                    clear filters
                </button>
            </form>
            </article>
           
        </Wrapper>
    )
}

const  Wrapper = styled.article`
article{
    background: var(--clr-white);
    border-radius: var(--radius);
    padding:0.25rem 0;
}


.form-control{
    margin-bottom:1.25rem;
    h5{
        margin-bottom:0.5rem;
    }
}
button{
    display:block;
    background:transparent;
    border:none;
    text-transform:capitalize;
    letter-spacing: var(--spacing);
    margin:0.25rem 0;
    padding:0.25rem 0;
    cursor:pointer;
    border-bottom: 1px solid transparent;
    color: var(--clr-grey-5);

}
.brand{
    border-radius: var(--radius);
    border-color: transparent;
    padding:0.25rem;
    background: var(--clr-grey-10);
}

.price{
    text-transform:capitalize;
}
.clearBtn{
      padding: 0.25rem 0.5rem;
      background: var(--clr-red-dark);
      color: var(--clr-white);
      border-radius: var(--radius);
      
}





@media (min-width: 576px){

  .menu{
    display:block;
    position:absolute;
    top:0;
    left:0;
    cursor:pointer;
    svg{
        
        animation: spinner 2s linear infinite;;
      font-size:2.5rem;
      color:rgba(0, 0, 0, 0.65);
      transition: var(--transition);
    }
  }
}



 @media (min-width: 768px) {
    article {
      position: sticky;
      top: 1rem;
    }
  }
    




`

export default Filters
