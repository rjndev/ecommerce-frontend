import React from 'react'

import {Container, Form} from 'react-bootstrap'
import ShipmentCard from '../../components/ShipmentCard'
import useOrderDetails from '../../hooks/useOrderDetails'
import { useState, useEffect } from 'react'

function Shipments() {
	const {getProductsFromOrder} = useOrderDetails('localhost:4000')
	const [allOrders, setAllOrders] = useState([])


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
					<ShipmentCard key={i} orderData={order} />
				)
			})}
			
		</>
	)
}

export default Shipments