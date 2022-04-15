import React from 'react'

import { Modal, Container, Button, Form, FloatingLabel} from 'react-bootstrap'

import { useState, useEffect } from 'react'
import useProductDetails from '../../hooks/useProductDetails'
import Swal from 'sweetalert2'

function AddProductModal({currProductForEdit, showModal, setShowModal, isAdd, setIsAdd, productDetails}) {
	const [allCategories,setAllCategories] = useState([])
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [description, setDescription] = useState('')
	const [categories, setCategories] = useState([])
	const [imagePath, setImagePath] = useState('')


	const {getCategories, addProduct, editProduct} = useProductDetails('https://whispering-anchorage-97427.herokuapp.com')

	const handleClose = () => setShowModal(false)

	const handleAdd = async() => {
		console.log("ADDING DATA")
		const data = {
			name,
			price : parseInt(price),
			description,
			categories,
			imagePath
		}
		console.log(data)

		const result = await addProduct(localStorage.getItem('token'), data)

		console.log(result)
		if(result == "OK") {
			Swal.fire({
				icon: 'success',
				title : 'Success!',
				text : 'Successfully added the item.'
			})
			setName('')
			setPrice(0)
			setDescription('')
			setCategories([])
			setImagePath('')
			setShowModal(false)
		} else if(result == "EP") {
			Swal.fire({
				icon: 'warning',
				title : 'Oops..',
				text : 'Product already exists.'
			})
		} else {
			Swal.fire({
				icon: 'error',
				title : 'Error!',
				text : 'Something went wrong.'
			})
		} 
	}

	const handleEdit = async() => {
		const data = {
			name,
			price : parseInt(price),
			description,
			categories,
			imagePath
		}

		const result = await editProduct(localStorage.getItem('token'), currProductForEdit._id.toString(), data)
	
		if(result =="OK") {
			Swal.fire({
				icon: 'success',
				title : 'Success!',
				text : 'Successfully edited the item.'
			})
			setName('')
			setPrice(0)
			setDescription('')
			setCategories([])
			setImagePath('')
			setShowModal(false)
			setIsAdd(true)

		} else {
			Swal.fire({
				icon: 'error',
				title : 'Error!',
				text : 'Something went wrong, please try again.'
			})
		}
	}

	const getCategoriesFromServer = async () => {
		const result = await getCategories()

		if(result != 'failed') {
			setAllCategories([...result])
		}
	}

	useEffect(() => {
		getCategoriesFromServer()

	}, [showModal]) 

	return (
		<>
			<Modal
				size='lg'
				centered
				show={showModal}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					{isAdd == true ? 
						<Modal.Title>Add New Product</Modal.Title>
						:
						<Modal.Title>Edit {currProductForEdit.name}</Modal.Title>
					}
					
				</Modal.Header>

				<Modal.Body>
					<Container>
						<Form>
							<Form.Group className='d-flex flex-column justify-content-center'>
									<Form.Label>Product Name</Form.Label>
									<Form.Control onChange={e => setName(e.target.value)} className='' type='text' placeholder='Product Name' />
							</Form.Group>

							<Form.Group className='d-flex flex-column justify-content-center'>
									<Form.Label>Desciption</Form.Label>
									<Form.Control onChange={e => setDescription(e.target.value)} as='textarea' rows={3}  />
							</Form.Group>
							<Form.Group className='d-flex flex-column justify-content-center'>
									<Form.Label>Price</Form.Label>
									<Form.Control onChange={e => setPrice(e.target.value)} type='number'   />
							</Form.Group>

							<Form.Group className='d-flex flex-column justify-content-center'>
									<Form.Label>Categories</Form.Label>
									<Form.Select onChange={e => setCategories([{name : e.target.value}])}>
										<option>Select...</option>
										{allCategories.map(curr => {
											return (
												<option value={curr.name}>{curr.name}</option>
											)
										})}
									</Form.Select>
							</Form.Group>

							<Form.Group className='d-flex flex-column justify-content-center'>
									<Form.Label>Image Path</Form.Label>
									<Form.Control onChange={e => setImagePath(e.target.value)} type='text'   />
							</Form.Group>
						</Form>
					</Container>
				</Modal.Body>

				<Modal.Footer className='d-flex justify-content-center'>
					{isAdd == true ? 
						<Button onClick={handleAdd} variant='success'>Add</Button>
						:
						<Button onClick={handleEdit} variant='success'>Edit</Button>
					}
					
				</Modal.Footer>

			</Modal>
		</>
	)
}

export default AddProductModal