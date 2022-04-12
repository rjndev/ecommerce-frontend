import React from 'react'

import { useState, useEffect } from 'react'
import {Form, Button, FloatingLabel, Container} from 'react-bootstrap'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import validator from 'validator'
import Swal from 'sweetalert2'
import useAuthenticate from '../hooks/useAuthenticate'
import { useNavigate } from 'react-router'

function RegisterSeller() {

	const [storeName, setStoreName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [disableButton, setDisableButton] = useState(true)


	const [validStoreName, setValidStoreName] = useState(false)
	const [validEmail, setValidEmail] = useState(false)
	const [validPass, setValidPass] = useState(false)
	const [validConfirmPass, setValidConfirmPass] = useState(false)

	const {registerSeller} = useAuthenticate('localhost:4000')
	const nav = useNavigate()

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

		if(storeName.length > 1) {
			setValidStoreName(true)
		} else {
			setValidStoreName(false)
		}

		if(validator.isEmail(email)) {
			setValidEmail(true)
		} else {
			setValidEmail(false)
		}
	}

	const handleSignup = async () =>{
		const result = await registerSeller({storeName, email, password})

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
				text : 'Welcome to Amazonia, merchant!',
				confirmButtonText : 'Confirm'
			}).then(result => {
				if(result.isConfirmed || result.isDismissed) {
					nav('/login')
				}
			})
		} else if(result === false) {
			Swal.fire({
				icon : 'error',
				title : 'Merchant Exists',
				text : 'Please enter a new email or Store name!'
			})
		}

	}

	useEffect(() => {
		validateForm()
	}, [password, confirmPass, email, storeName])

	useEffect(() => {
		if(validStoreName && validEmail && validPass && validConfirmPass) {
			setDisableButton(false)
		} else {
			setDisableButton(true)
		}
	}, [validStoreName, validEmail, validPass, validConfirmPass])


	return (
		<>
			<Container className='d-flex min-vh-100 justify-content-center align-items-center'>
				<Form className='w-50 d-flex flex-column'>

					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingName' label='Store Name' className='w-100 me-3'>
							<Form.Control onChange={e => setStoreName(e.target.value)} type='text' placeholder='store name' />
						</FloatingLabel>
						{validStoreName === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingEmail' label='Email' className='w-100 me-3'>
							<Form.Control onChange={e => setEmail(e.target.value)} type='email' placeholder='email' />
						</FloatingLabel>
						{validEmail === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='mb-2 d-flex align-items-center'>
						<FloatingLabel controlId='floatingPassword' label='Password' className='w-100 me-3'>
							<Form.Control onChange={e => setPassword(e.target.value)} type='password' placeholder='password' />
						</FloatingLabel>
						{validPass === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='mb-4 d-flex align-items-center'>
						<FloatingLabel controlId='floatingCPassword' label='Confirm Password' className='w-100 me-3'>
							<Form.Control onChange={e => setConfirmPass(e.target.value)} type='password' placeholder='password' />
						</FloatingLabel>
						{validConfirmPass === true ?  <BsFillCheckCircleFill className='text-success' size={32} opacity={1}/> : <BsFillCheckCircleFill size={32} opacity={0}/>}
					</Form.Group>

					<Form.Group className='d-flex flex-column align-items-center'>
						{disableButton === true ? <Button disabled={true}>Sign up!</Button> : <Button onClick={handleSignup}>Sign up!</Button> }
					</Form.Group>
				</Form>

			</Container>
		</>
	)
}

export default RegisterSeller