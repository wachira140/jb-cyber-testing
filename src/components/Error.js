import React from 'react'
import styled from 'styled-components'

const Error = () => {

    return (
        <Wrapper>
            <h4>an error occured</h4>
            <p>please try again</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100vh;
 background: var(--clr-grey-10);
h4{
    font-size:1.75rem
}
p{
    font-size:1.25rem;
}
`

export default Error
