import React from 'react'
import styled from 'styled-components'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import { useFilterContext } from '../context/filterContext'

const Sort = () => {
    const { setListView, setGridView, updateSort, sort} = useFilterContext()
    return (
        <Wrapper>
            <div className="btn-container">
                 <button type='button' onClick={setGridView}>
                     <BsFillGridFill />
                </button>  
                 <button type='button' onClick={setListView}>
                     <BsList />
                </button>  
            </div>
            <h5>all products</h5>
            <form>
                <label htmlFor="sort">sort by</label>
                <select name="sort" id="sort" className='sort' onChange={updateSort} value={sort}>
                    <option value="price-lowest">price (lowest)</option>
                    <option value="price-highest">price (highest)</option>
                    <option value="name-a">name (a-z)</option>
                    <option value="name-z">name (z-a)</option>
                </select>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.article`
background: var(--clr-orange);
border-radius: var(--radius);
display:flex;
flex-wrap:wrap;
// grid-template-columns: auto 1fr auto;
// column-gap:1rem;
align-items: center;
justify-content:space-between;
padding:0.5rem;


.btn-container{
    display:grid;
    grid-template-columns:1fr 1fr;
    column-gap:0.5rem;
    margin:1rem 0;
    button{
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
        width:1.5rem;
        height:1.5rem;
        color: var(--clr-black);
        border: 1px solid var(--clr-black);
        border-radius: var(--radius);
        background:transparent;
        svg{
            font-size: 1rem;
        }
    }
}

h5{
    font-size:0.75rem;
}

label{
    margin-right:0.5rem;
    text-transform:capitalize;
    font-weight:500;
}

.sort{
    border:transparent;
    background:transparent;
    padding:0.25rem 0.2rem;
    font-size:1rem;
    text-transform:capitalize;
}

@media (min-width: 576px){
    h5{
    font-size:0.95rem;
}
}
 @media (min-width: 768px) {
    .btn-container{
        margin-left:2rem;
    }
  }

`

export default Sort
