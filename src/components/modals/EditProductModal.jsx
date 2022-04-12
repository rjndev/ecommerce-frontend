import React from 'react'
import { Modal, Container, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import Swal from 'sweetalert2'
import useOrderDetails from '../../hooks/useOrderDetails'



function EditProductModal({showModal, setShowModal, productName, editQuantity, index, setValueRefresh}) {
	const [show, setShow] = useState(showModal)
	const [quantity, setQuantity] = useState(0)
	const handleClose = () => setShowModal(false)
	const handleShow = () => setShow(true)
	const {editProductQuantity} = useOrderDetails('localhost:4000')

	const handleEdit = async () => {

		if(quantity > 0) {
			const result = await editProductQuantity(localStorage.getItem('token'), index, quantity)

			if(result == "OK") {
				Swal.fire({
					icon: 'success',
					title : 'Success!',
					text : 'Successfully edited the item.'
				})
				setValueRefresh(prev => !prev)
				setQuantity(0)
				setShowModal(false)
			} else {
				Swal.fire({
					icon: 'error',
					title : 'Error!',
					text : 'Something went wrong, please try again.'
				})
			}
		} else {
			Swal.fire({
				icon: 'warning',
				title : 'Oops!',
				text : 'Please enter a valid quantity.'
			})
		}

		
	}

	return (
		<>
			<Modal
				size='m'
				centered
				show= {showModal}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>{`Edit Product ${productName}`}</Modal.Title>
				</Modal.Header>
				
				<Modal.Body>
					<Container>
						<Form>
							<Form.Group>
								<Form.Label>Quantity</Form.Label>
								<Form.Control className='w-100' type='number' onChange={(e) => setQuantity(e.target.value)} />
							</Form.Group>
						</Form>
					</Container>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={handleEdit} variant='success'>Confirm</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default EditProductModal