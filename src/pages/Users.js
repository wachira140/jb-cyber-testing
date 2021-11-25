import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaSpinner, FaUser } from 'react-icons/fa'
import { MdEmail, MdVerifiedUser } from 'react-icons/md'
import { GrFormView, GrCheckmark} from 'react-icons/gr'
import { useAdminContext } from '../context/adminContext'

const Users = () => {

    const {
         users,
          setTableFilters,
           email,
            getUsers
         } = useAdminContext()


    const {filter_users, loading, error, msg } = users


useEffect(() => {
    getUsers()
}, [])


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




    return (
        <Wrapper>
            <div className='header'>
                <h5>({filter_users.length}) users</h5>
                <input 
                type='text'
                name='email'
                onChange={setTableFilters}
                value={email}
                className='payments'
                placeholder='e.g Example@Email.com' />
            </div>
            <div className ='body'>
                {
                    filter_users.length < 1 && <div className="empty">
                            <h4>no users</h4>
                                <h5>market the brand well</h5>
                            </div>
                }
                <table className='table section-center'>
                <thead>

                <tr className='table-header'>
                <th>#</th>
                <th><FaUser/></th>
                <th><MdEmail/></th>
                <th><MdVerifiedUser/></th>
                <th>view</th>
                </tr>
                </thead>

            <tbody>
                { filter_users.map((item, index)=>{
                    const { name, email, isVerified, _id } = item
                  
                    return (
                <tr className='item'
                            key={_id}>

                    <td className='item-content'>{index +1}</td>
                    <td className='item-content'>{ name.slice(0,16) }</td>
                    <td className='item-content'>{email.slice(0,16)}</td>
                    <td className='item-content'>{isVerified && <GrCheckmark/>}</td>
                    <td className='item-content'>
                        <Link to={`/admin/view-user/${_id}`}>
                             <GrFormView className='view'/>
                         </Link>
                          </td>
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
   min-height:100vh;
   position:relative;
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
        input{
            margin-right: 1rem;
            padding: 0.15rem 0.85rem;
            border-radius: var(--radius);
        }

    }

    .table{
    text-align:start;
   border:1px solid var(--clr-gray);
   box-shadow: var(--dark-shadow);
   border-radius: var(--radius);
}

.body{
    position:relative;
    background: var(--clr-white);
}



.center{
position:absolute;
background:rgba(255, 255, 255, 0.752);
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
    flex-direction:column;
    padding:0 2rem;
    text-align:center;
    color: red;
    .btn{
        background: var(--clr-green-dark);
        color: var(--clr-black);
    }
}
.empty{
   position:absolute;
background:rgba(255, 255, 255, 0.752);
box-shadow: var(--dark-shadow);
left:50%;
top:0;
transform:translateX(-50%);
height:100vh;
width:100%;
padding:1rem 0;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
    h5{
        color: var(--clr-green-dark);
    }
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
  .view{
        color:var( --clr-green-dark);
        font-size:1.25rem;
    }
.items{
    font-size:1.05rem;
    font-weight:400;
    color:var(--clr-grey-1);
}

.pending{
    background: var(--clr-orange);
}

.paid{
    background: var(--clr-green-light);
}

.failed{
    background:red;
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
    .failed-delete{
    color: var(--clr-white);
}
    .featured{
        color:var(--clr-green-dark);
    }
}
`

export default Users
