import React from 'react'
import {useState, useEffect} from 'react'
import {Form, Button, FloatingLabel, Container} from 'react-bootstrap'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import validator from 'validator'
import useAuthenticate from '../hooks/useAuthenticate'
import Swal from 'sweetalert2'
import {Link, useNavigate} from 'react-router-dom'

function Register() {

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [disableButton, setDisableButton] = useState(true)

	const [validFName, setValidFName] = useState(false)
	const [validLName, setValidLName] = useState(false)
	const [validEmail, setValidEmail] = useState(false)
	const [validPass, setValidPass] = useState(false)
	const [validConfirmPass, setValidConfirmPass] = useState(false)
	const nav = useNavigate()
	
	const {register} = useAuthenticate()

	const validateForm = () => {
		if(password.length >= 8) {
			setValidPass(true)
			if(password === confirmPass){
				setValidConfirmPass(true)
			} else {
				setValidConfirmPass(false)
			}
		} else {
			setValidPass(false)
		}

		if(firstName.length > 1) {
			setValidFName(true)
		} else {
			setValidFName(false)
		}

		if(lastName.length > 5) {
			setValidLName(true)
		} else {
			setValidLName(false)
		}
		
		if(validator.isEmail(email)) {
			setValidEmail(true)
		} else {
			setValidEmail(false)
		}

	}

	const handleSignup = async () => {
		const result = await register({firstName, lastName, email, password})
		
		if(result === "ERR") {
			Swal.fire({
				icon : 'error',
				title : 'Oops...',
				text : 'Someting went wrong!',
				footer : 'Please try again',
			})
		} else if(result === true) {
			Swal.fire({
				title : 'Success!',
				text : 'Welcome to Amazonia!',
				confirmButtonText : 'Confirm'
			}).then(result => {
				if(result.isConfirmed || result.isDenied || result.isDismissed) {
					nav('/login')
				}
			})
		} else if(result === false) {
			Swal.fire({
				icon : 'error',
				title : 'User Exists',
				text : 'Please enter a new email!'
			})
		}
	}

	useEffect(() => {
		validateForm()
	}, [password, confirmPass, email, firstName, lastName])

	useEffect(() => {
		if(validFName && validLName && validEmail && validPass && validConfirmPass) {
			setDisableButton(false)
		} else {
			setDisableButton(true)
		}
	}, [validFName, validLName, validEmail, validPass, validConfirmPass])

	return (
		<>
			<Container className='d-flex min-vh-100 justify-content-center align-items-center'>
				<Form className='d-flex flex-column w-50'>
				
					<Form.Group className='mb-2 d-flex align-items-center'>	
						<FloatingLabel controlId='floatingFName' label='First Name' className='w-100 me-3'>
							<Form.Control type='text' placeholder='name' onChange={(e) => setFirstName(e.target.value) } />
						</FloatingLabel>
						{validFName === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingLName' label='Last Name' className='w-100 me-3'>
							<Form.Control type='text' placeholder='name' onChange={e => setLastName(e.target.value)} />
						</FloatingLabel>
						{validLName === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingEmail' label='Email' className='w-100 me-3'>
							<Form.Control type='email' placeholder='email' onChange={e => setEmail(e.target.value)}/>
						</FloatingLabel>
						{validEmail === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingPassword' label='Password' className='w-100 me-3'>
							<Form.Control type='password' placeholder='password' onChange={e => setPassword(e.target.value)}/>
						</FloatingLabel>
						{validPass === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='mb-5 d-flex align-items-center'>
						<FloatingLabel controlId='floatingCPassword' label='Confirm Password' className='w-100 me-3'>
							<Form.Control type='password' placeholder='password' onChange={e => setConfirmPass(e.target.value)} />
						</FloatingLabel>
						{validConfirmPass === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='d-flex flex-column align-items-center'>
						{disableButton === true ? <Button disabled={true}>Sign up!</Button> : <Button onClick={handleSignup}>Sign up!</Button> }
					</Form.Group>

					<Form.Group className='d-flex justify-content-center'>
							<Form.Text>Are you a merchant? Sign up <Link to='/registerSeller'>here</Link> instead.</Form.Text>
						</Form.Group>
				</Form>
			</Container>
		</>
	)
}

export default Register