import React from 'react'
import {Form, Container, FloatingLabel, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Login() {
	return (
		<>
			<Container className='d-flex min-vh-100 justify-content-center align-items-center'>
				<Form className='w-50 d-flex flex-column'>
					<Form.Group className='mb-3 mt-3'>
						<FloatingLabel controlId='floatingEmail' label='Email address' >
							<Form.Control type='email' placeholder='email@mail.com' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group className='mb-3 mt-3'>
						<FloatingLabel controlId='floatingPassword' label='Password' >
							<Form.Control type='password' placeholder='password'/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='d-flex flex-column  align-items-center'>
						<Button variant='success'>Log in</Button>
						<Form.Group>
							<Form.Text>Dont have an account? Sign up <Link to='/register'>here</Link>.</Form.Text>
						</Form.Group>
					</Form.Group>
					
					
				</Form>
			</Container>
		</>
	)
}

export default Login