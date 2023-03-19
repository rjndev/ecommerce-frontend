import React from 'react'
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { useNavigate } from 'react-router'
import SearchBar from './SearchBar'

function AppNavBar() {
	const {userLoggedIn, userData, isSeller} = useUserContext()
	const nav = useNavigate()


	return (
		<Navbar bg="dark" variant="dark" expand='lg' fixed='top' >
			<Container className='d-flex justify-content-between'>
				<Navbar.Brand className='' onClick={() => nav('/')} style={{cursor : 'pointer'}}>Amazonia</Navbar.Brand>
				<Navbar.Toggle aria-controls='collapse-nav' />
				<Navbar.Collapse id ='collapse-nav' >
					<Container className='d-flex align-items-center'>
						<Nav className='me-auto ms-auto w-75 px-5 py-2 align-items-center'>
							<Container className='d-flex align-items-center'>
								<Form className='d-flex w-100'>
									<SearchBar />
								</Form>
							</Container>
						</Nav>

						{(userLoggedIn && !isSeller) && 
							<Nav className='my-auto me-auto py-auto'>
								<Nav.Item as='p' className='text-white mt-3 align-self-center'>{`Hello, ${userData.firstName}!`}</Nav.Item>
							</Nav>
						}
						
						<Nav className='d-flex align-items-center'>
							{userLoggedIn === false ? 
								<>
									<Nav.Link as={Link} to='/login'>Login</Nav.Link>
									<Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
								</>	
								:
								<>
									{!isSeller && 
										<Nav.Link as={Link} to='/cart'>Cart</Nav.Link>
									}
									<Nav.Link as={Link} to='/logout'>Logout</Nav.Link>
								</>
							}
						</Nav>
					</Container>
				
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default AppNavBar