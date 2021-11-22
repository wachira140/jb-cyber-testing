import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {FaTrash, FaEdit } from 'react-icons/fa'
import {FaSpinner} from 'react-icons/fa'
import { useAdminContext } from '../context/adminContext'
import { formatPrice } from '../utils'

const AllProducts = () => {

    const { all_products ,loading, error, deleteProduct, msg, editItem } = useAdminContext()

    const { products  } = all_products


if(loading){
    return(
        <Wrapper>
            <div className='center'>
            <FaSpinner className='icon spinner'/>
            </div>
        </Wrapper>
    )
}

if(error){
    return(
        <Wrapper>
            <div className='center error'>
            <h5>{msg}</h5>
            </div>
        </Wrapper>
    )
}

if(products.length < 1){
    return(
         <Wrapper>
            <div className="center empty">
            <h4>no products</h4>
                <h5>the store is empty!!</h5>
            </div>
        </Wrapper>
    )
}


    return (
        <Wrapper>
            <div className="contaier">
                <div className='header'>
                    <h5>({products.length}) products</h5>
                </div>
    <table className='table section-center'>
                <thead>

                <tr className='table-header'>
                <th>No</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                {/* <th>Featured</th> */}
                <th>Edit</th>
                <th>Delete</th>
                </tr>
                </thead>

            <tbody>
                { products.map((item, index)=>{
                    const { name, brand, _id, price } = item
                    return (
                <tr className='items' key={_id}>
                    <td className='item-content'>{index +1}</td>
                    <td className='item-content'>{`${name}`.slice(0,16)}</td>
                    <td className='item-content'>{`${brand}`.slice(0,7)}</td>
                    <td className='item-content'>{formatPrice(price)}</td>
                    {/* <td className='item-content '>{ featured && <TiTick className='featured'/>}</td> */}
                    <td className='item-content' onClick={()=>editItem(_id)}>
                        <Link to={`/admin/edit-item/${_id}`}>
                             <FaEdit className='edit'/>
                         </Link>
                          </td>
                    <td className='item-content'
                    onClick={()=>deleteProduct(_id)} ><FaTrash className='delete' /></td>
                </tr>

                    )
                })}
            </tbody>
            </table>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

position:relative;
min-height:100vh;

  .header{
        background: var(--clr-white);
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding: 0.4rem 0.55rem;
        margin-bottom:0.75rem;
        box-shadow: var(--dark-shadow);
        border-radius: var(--radius);
        h5{
            margin:0;
        }

    }


.center{
position:absolute;
background:rgba(255, 255, 255, 0.452);
box-shadow: var(--dark-shadow);
left:50%;
bottom:0;
transform:translateX(-50%);
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items:center;

svg{
    font-size:2rem;
}
}

.error{
    padding:0 2rem;
    text-align:center;
    color:red;
}

.empty{
    flex-direction:column;
    padding:0 2rem;
    text-align:center;
    color: red;
    h5{
        color: var(--clr-green-dark);
    }
}

.table{
    text-align:start;
   border:1px solid var(--clr-gray);
   box-shadow: var(--dark-shadow);
}

.table tbody:nth-child(even){
    background-color:var(--clr-white);
}
tbody tr:nth-child(odd){
    background-color:var(--clr-grey-9);
}
.table-header th{
    padding-bottom:1rem;
    font-family: Georgia, 'Times New Roman', Times, serif;
    background:var( --clr-white);
    text-align:center;
}
tbody{
    font-family:"Roboto", sans-serif;
}
.items{
    font-size:1.05rem;
    font-weight:400;
    color:var(--clr-grey-1);
}
.item-content{
    text-transform:capitalize;
    text-align:center;
    font-size:0.85rem;
}

@media(min-width: 576px){
    .item-content{
        font-size:1rem;
    }
}

td{
    padding:0.5rem 0.25rem 0.5rem 0.45rem;
    svg{
        font-size:1rem
    }
    svg:hover{
        cursor:pointer;
    }
    .edit{
        color:var( --clr-green-dark);
    }
    .delete{
        color:var(--clr-red-dark);
    }
    .featured{
        color:var(--clr-green-dark);
    }
}
`

export default AllProducts
