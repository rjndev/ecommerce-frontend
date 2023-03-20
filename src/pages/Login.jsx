import React from 'react'
import {Form, Container, FloatingLabel, Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAuthenticate from '../hooks/useAuthenticate'
import {useUserContext} from '../context/UserContext'
import {useNavigate} from 'react-router-dom'


function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {login, loginSeller} = useAuthenticate('https://amazonia-backend.onrender.com')
	const {setUserLoggedIn, userLoggedIn, setIsSeller} = useUserContext()
	const nav = useNavigate()

	

	const handleLogin = async () => {
		const res = await login({email, password})
		console.log(res)
		if(res) {
			localStorage.setItem('token', res.auth)
			setUserLoggedIn(true)
		} else {
			const res2 = await loginSeller({email, password})
		
			if(res2) {
				localStorage.setItem('token', res2.auth)
				setUserLoggedIn(true)
				setIsSeller(true)
			}
		}
	}

	useEffect(() => {
		if(userLoggedIn) {
			nav('/')
		}
	}, [userLoggedIn])

	return (
		<>
			<Container className='d-flex min-vh-100 justify-content-center align-items-center'>
				<Form className='w-50 d-flex flex-column'>
					<Form.Group className='mb-3 mt-3'>
						<FloatingLabel controlId='floatingEmail' label='Email address' >
							<Form.Control type='email' placeholder='email@mail.com' onChange={e => setEmail(e.target.value)}/>
						</FloatingLabel>
					</Form.Group>
					
					<Form.Group className='mb-3 mt-3'>
						<FloatingLabel controlId='floatingPassword' label='Password' >
							<Form.Control type='password' placeholder='password' onChange={e => setPassword(e.target.value)}/>
						</FloatingLabel>
					</Form.Group>

					<Form.Group className='d-flex flex-column  align-items-center'>
						<Button variant='success' onClick={handleLogin}>Log in</Button>
						
						<Form.Group>
							<Form.Text>Dont have an account? Sign up <Link to='/signup'>here</Link>.</Form.Text>
						</Form.Group>
					</Form.Group>
				</Form>
			</Container>
		</>
	)
}

export default Login