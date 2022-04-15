import React from 'react'

import {Modal, Container, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2'

function ProductsFromOrderModal({orderDetails, showModal, setShowModal}) {
	const handleClose = () =>  setShowModal(false)

	return (
		<>
			<Modal
				size='m'
				centered
				show={showModal}
				onHide={handleClose}
			>

				<Modal.Header closeButton>
					<Modal.Title>Products in order.</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Container>
						<Form>
							{orderDetails.order?.products.map(curr => {
								<Form.Group>
									<label htmlFor="">{curr.productId}</label>
								</Form.Group>
							})}
						</Form>
					</Container>
				</Modal.Body>

			</Modal>
		</>
	)
}

export default ProductsFromOrderModal