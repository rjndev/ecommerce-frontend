import React from 'react'
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function AppNavBar() {
	return (
		<Navbar bg="dark" variant="dark" expand='lg' fixed='top' >
			<Container className='d-flex justify-content-between'>
				<Navbar.Brand className=''>Amazonia</Navbar.Brand>
				<Navbar.Toggle aria-controls='collapse-nav' />
				<Navbar.Collapse id ='collapse-nav' >
					<Container className='d-flex'>
						<Nav className='me-auto ms-auto flex-grow-1 px-5 py-2 align-items-center'>
							<Container>
								<Form className='d-flex'>
									<FormControl type='search' placeholder='Search items...' className='me-2 input-height-sm' aria-label='search' />
									<Button variant='outline-info'>Search</Button>
								</Form>
							</Container>
						</Nav>
						<Nav className='d-flex align-items-center'>
							<Nav.Link as={Link} to='/login'>Login</Nav.Link>
							<Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
						</Nav>
					</Container>
				
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default AppNavBar