import React from 'react'
import {useState, useEffect} from 'react'
import {Form, Button, FloatingLabel, Container} from 'react-bootstrap'
import axios from 'axios'
import {BsFillCheckCircleFill} from 'react-icons/bs'

function Register() {

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [disableButton, setDisableButton] = useState(true)


	const validatePassword = () => {
		if(password.length >= 8 && password == confirmPass) {
			setDisableButton(false)
		}
	}

	const handleSignup = async () => {
			
	}

	useEffect(() => {
		validatePassword()
	}, [password, confirmPass])

	console.log()

	return (
		<>
			<Container className='d-flex min-vh-100 justify-content-center align-items-center'>
				<Form className='d-flex flex-column w-50'>
				
					<Form.Group className='mb-2 d-flex align-items-center'>	
						<FloatingLabel controlId='floatingFName' label='First Name' className='w-100 me-3'>
							<Form.Control type='text' placeholder='name' onChange={(e) => setFirstName(e.target.value) } />
						</FloatingLabel>
						<BsFillCheckCircleFill className='text-success' size={32} opacity={0}/>
					</Form.Group>
					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingLName' label='Last Name' className='w-100 me-3'>
							<Form.Control type='text' placeholder='name' onChange={e => setLastName(e.target.value)} />
						</FloatingLabel>
						<BsFillCheckCircleFill className='text-success' size={32} opacity={0}/>
					</Form.Group>
					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingEmail' label='Email' className='w-100 me-3'>
							<Form.Control type='email' placeholder='email' onChange={e => setEmail(e.target.value)}/>
						</FloatingLabel>
						<BsFillCheckCircleFill className='text-success' size={32} opacity={0}/>
					</Form.Group>
					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingPassword' label='Password' className='w-100 me-3'>
							<Form.Control type='password' placeholder='password' onChange={e => setPassword(e.target.value)}/>
						</FloatingLabel>
						<BsFillCheckCircleFill className='text-success' size={32} opacity={0}/>
					</Form.Group>
					<Form.Group className='mb-5 d-flex align-items-center'>
						<FloatingLabel controlId='floatingCPassword' label='Confirm Password' className='w-100 me-3'>
							<Form.Control type='password' placeholder='password' onChange={e => setConfirmPass(e.target.value)} />
						</FloatingLabel>
						<BsFillCheckCircleFill className='text-success' size={32} opacity={0}/>
					</Form.Group>

					<Form.Group className='d-flex flex-column align-items-center'>
						{disableButton == true ? <Button disabled={true}>Sign up!</Button> : <Button>Sign up!</Button> }
						
					</Form.Group>
				</Form>
			</Container>
		</>
	)
}

export default Register