import React, { useEffect } from 'react'

import {Button, Container} from 'react-bootstrap'
import {BiDetail} from 'react-icons/bi'
import { useState } from 'react'


function ShipmentCard({orderData, setShowModal, setCurrOrder}) {
	const [totalItems, setTotalItems] = useState(0)
	const [totalAmount, setTotalAmount] = useState(0)

	const handleShowModal = () => {
		console.log("SETTING CURR ORDER")
		console.log(orderData)
		setCurrOrder({...orderData})
		setShowModal(true)
	}


	useEffect(() => {
		orderData.productsInvolved.forEach(curr => {
			console.log("CURRENT PRODZZ")
			console.log(curr)
			setTotalItems(prev => prev + parseInt(curr.amount))

			setTotalAmount(prev => prev + (parseInt(curr.amount) * parseInt(curr.product.price)))
		})
	}, [orderData])
	
	return (
		<>
			<Container className='shadow rounded d-flex align-items-center'>
				<Container className='py-3 d-flex'>
					<Container className='d-flex flex-column'>
						<h5>#{orderData.order._id}</h5>
				</Container>
				</Container>
				
				<Container className='py-3 '>
					<h6>Total Items: </h6>
					<p>{totalItems}</p>
				</Container>
				
				<Container className='py-3 '>
					<h6>Total Amount: </h6>
					<p>${totalAmount}</p>
				</Container>

				<Container className='py-3 d-flex justify-content-center'>
					<Button onClick={handleShowModal} style={{width : '5em'}}><BiDetail style={{fontSize : '1.35rem'}}/></Button>
				</Container>


			</Container>
		</>
	)
}

export default ShipmentCard