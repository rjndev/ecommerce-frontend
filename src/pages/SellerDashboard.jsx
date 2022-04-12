import React from 'react'

import {Container, Form} from 'react-bootstrap'
import {useUserContext} from '../context/UserContext'
import SellerSideBar from '../components/SellerSideBar'
import Shipments from './sidePages/Shipments'
import SellerProducts from './sidePages/SellerProducts'
import { useState } from 'react'


function SellerDashboard() {
	const {userData} = useUserContext()
	const [currTab, setCurrTab] = useState('shipments')


	return (
		<>
			<div className='mt-3 min-vh-100 d-flex '>
				
					<div className='mt-5 pt-5 bg-dark'>
						<SellerSideBar setCurrTab={setCurrTab} currTab={currTab} / >
					</div>

				
				
					<Container className='d-flex flex-column m-3 p-0'>
						
						<h2 className='ms-3 mt-5 pt-3'>Seller Dashboard</h2>
						
						<Container className='w-75'>
							{currTab == 'shipments' && 
								<Shipments />
							}
							{currTab == 'products' && 
								<SellerProducts />
							}
							
						</Container>
					</Container>
					
			</div>
		</>
	)
}

export default SellerDashboard