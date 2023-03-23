import React from 'react'

import {Container, Form} from 'react-bootstrap'
import ShipmentCard from '../../components/ShipmentCard'
import useOrderDetails from '../../hooks/useOrderDetails'
import { useState, useEffect } from 'react'
import ProductsFromOrderModal from '../../components/modals/ProductsFromOrderModal'
import backendConnection from '../../backendConstant'

function Shipments() {
	const {getProductsFromOrder} = useOrderDetails(backendConnection)
	const [allOrders, setAllOrders] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [currOrder, setCurrOrder] = useState({})


	const getOrders = async () => {
		const result = await getProductsFromOrder(localStorage.getItem('token'))

		if(result !== "ERR") {
			console.log("NOT ERR")
			setAllOrders([...result])
		} else {
			console.log("ERR")
		}
	}

	useEffect(() => {
		getOrders()
	}, [])

	return (
		<>
			{allOrders.map((order, i) => {
				return (
					<ShipmentCard setCurrOrder={setCurrOrder} key={i} setShowModal={setShowModal} orderData={order} />
				)
			})}
			
			<ProductsFromOrderModal showModal={showModal} setShowModal={setShowModal} orderDetails={currOrder}/>
		</>
	)
}

export default Shipments