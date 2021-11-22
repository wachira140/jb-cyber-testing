import React from 'react'
import { useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { FaSpinner } from 'react-icons/fa'
import { useAdminContext } from '../context/adminContext'

const EditProduct = () => {


    const history = useHistory()

    const { 
        all_products, 
        setEditValues,
         newCategory,  
         isNew,
        submitEdited,
        editedProduct,
        edit,
        resetEditForm,
        resetEditFormError,
     } = useAdminContext()

    const {
        name, 
        brand, 
        classification, 
        amount,
         category,
         color,
         featured,
          price,
           desc,
           image, 
        } =editedProduct




    if(edit.success){
        setTimeout(()=>{
            resetEditForm()
            history.push('/admin')
        },3000)
    }



      const categories = all_products.products.map((item) => item.category)
    const uniqueCategories = ['category',...new Set(categories)]

        if(edit.loading){
    return(
        <Wrapper>
            <div className='loading'>
            <FaSpinner className='icon spinner'/>
            </div>
        </Wrapper>
    )
}

if(edit.error){
    return(
        <Wrapper>
            <div className='loading center error'>
            <h5>{edit.msg}</h5>
            <h5 className='btn' onClick={resetEditFormError}>try again</h5>
            </div>
        </Wrapper>
    )
}
if(edit.success){
    return(
        <Wrapper>
            <div className='loading center success'>
            <h5>{edit.msg}....</h5>
            </div>
        </Wrapper>
    )
}



    return (
        <Wrapper>
            <div className="item-container">
                <form 
                    action="/" 
                    method='POST' 
                    className='form-data' 
                    onSubmit={submitEdited}>
                        
              {/* ***********name******** */}
                    <div className="control">
                    <label htmlFor="name">name</label>

                <input type="text"
                    placeholder='name of product'
                    className='form-input'
                    name='name'
                    maxLength='50'
                    value={name}
                    onChange={setEditValues}
                    />
                    </div>

              {/* ***********brand******** */}
                <div className="control">
                <label htmlFor="brand">brand</label>
                <input type="text"
                    className='form-input'
                    name='brand'
                    placeholder='enter brand'
                    maxLength='50'
                    value={brand}
                    onChange={setEditValues}
                    />

                </div>

                 <div className="control">
                    <label htmlFor="class">class</label>
                    <select 
                        name="classification" className='class'
                         onChange={setEditValues} 
                        value={classification} >
                            <option>
                                class
                                </option>
                        <option>
                           a
                        </option>
                        <option>
                           b
                        </option>
                        <option>
                           c
                        </option>
                        <option>
                           d
                        </option>
                       
                     </select>
                     </div>
              
            <div className="form-center">

                  {/* ***********featured******** */}
                   <div className="control featured">
                <label htmlFor="featured">featured</label>
                <input type="checkbox"
                    data-id="featured"
                    checked={featured}
                    onChange={setEditValues}
                    />
              </div>

                      {/* ***********category******** */}
                <div className="control">
                    <label htmlFor="category">category</label>
                    <select 
                        name="company" className='company'
                         onChange={newCategory}>
                        <option value="existing">
                           existing
                        </option>
                         <option value="new">
                                new
                        </option>  
                        
                        
                     </select>

                </div>
            </div>

            <div className="section-center">

            {isNew ?  <div className="control d-block">
                    <label htmlFor="category">category</label>
                    <input type="text"
                         className='form-input mt-2'
                         name='category' 
                         placeholder='specify category'
                         value={category}
                         onChange={setEditValues}/>

                </div> :  <div className="control">
                    <select
                         name="category"
                         className='company'
                         maxLength='50'
                         value={category}
                         onChange={setEditValues}
                         >
    
                             {uniqueCategories.map((category, index)=>{
                                 return (
                                        <option 
                                            value={category}
                                            key={index}>
                                            {category}
                                        </option>
                                        )
                             })}
                     </select>

                </div>}
            </div>

           
               

                {/* ***********color******** */}
                <div className="control">
                    <label htmlFor="color">color</label>
                    <input type="text"
                        className='form-input' 
                        name='color'
                         placeholder='specify color'
                         maxLength='50'
                         value={color}
                         onChange={setEditValues}
                         />

                </div>

                      {/* ***********images******** */}
                <div className="control">
                    <label htmlFor="image">images</label>
                    <input type="file" 
                         className='file' 
                        data-name='image'
                         multiple accept='.jpg, .jpeg, .png'
                         value={image}
                         onChange={setEditValues}
                         />
                </div>


                    {/* ***********price******** */}
             <div className="control">
                <label htmlFor="price">price</label>
                <input type="number" 
                    className='form-input'
                     name='price' 
                     placeholder='price'
                     value={price}
                     onChange={setEditValues}
                     />

                </div>
             <div className="control">
                <label htmlFor="amount">amount</label>
                <input type="number" 
                    className='form-input'
                     name='amount' 
                     placeholder='amount'
                     value={amount}
                     onChange={setEditValues}
                     />

                </div>

                {/* ***************textarea************ */}
                    <div className="control">
                        <label htmlFor="desc">desc</label>
                       <textarea
                        name="desc" 
                        id="desc" cols="45" rows="5"
                         minLength='10'
                          maxLength='100'
                           placeholder='enter description'
                           value={desc}
                           onChange={setEditValues}
                     ></textarea>
                    </div>

                      {/* ***********submit******** */}
                <button type='submit'
                className='btn submit-btn'>
                   edit
                </button>
                
            </form>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
position:relative;
display:flex;
justify-content:center;
padding:1rem 1rem;
background: var(--clr-black);
color: var(--clr-white);
border-radius: var(--radius);
box-shadow: var(--dark-shadow);
min-height:100vh;

.loading{
position:absolute;
background:rgba(255, 255, 255, 0.452);
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

.center{
    padding:0 2rem;
    text-align:center;
    flex-direction:column;
}

.error{
    color: var(--clr-red-dark);
    .btn{
        background: var(--clr-red-dark);
    }
}

.success{
    color: var(--clr-green-light);
    .btn{
        background: var(--clr-green-dark);
    }
}

.form-data{
    text-align:center;
}
.control{
    display:grid;
    grid-template-columns: 1fr 200px;
    column-gap:2rem;
    margin-bottom:1rem;
    label{
        font-size:1rem;
        text-align:start;
        text-transform:capitalize;
        font-weight:500;
    }

    select{
        width:80px;
    }

    .class{
        width:40px;
    }
    input{
        width:200px;
        padding:0.2rem 0.25rem;
        border-radius: var(--radius);
        border:1px var(--clr-grey) solid;
    }

    textarea{
        padding:0.2rem 0.25rem;
        border-radius: var(--radius);
        border:1px var(--clr-grey) solid;
    }
}


.featured input{
    width:20px;
}

.submit-btn{
    padding:0.5rem 2rem;
    background: var(--clr-green-dark);
}

@media (min-width: 768px){
    .control{
        grid-template-columns: 1fr 300px;
        input{
            width:100%;
        }
    }

    .featured input{
    width:20px;
}
}

`

export default EditProduct
