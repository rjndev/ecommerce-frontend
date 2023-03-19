import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <div className='mt-auto w-100 h-auto bg-dark' >
        <Container className='d-flex flex-column align-items-center justify-content-center mt-2 pb-0 w-100 p-0'>
            <p  style={{color : "gray"}}>This sample website might take some time to load for some users.</p>
            <p style={{color : "gray"}}>Check out portfolio <span><a target="_blank" href='https://rjndev.github.io/web-portfolio/'>here.</a></span></p>
        </Container>
    </div>
  )
}

export default Footer