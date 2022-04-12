import React from 'react'

import {Container, Navbar, Nav} from 'react-bootstrap'

function SellerSideBar({setCurrTab, currTab}) {

	const handleSelect = (key) => {
		console.log("SELECTING KEY")
		console.log(key)
		setCurrTab(key)
	}
	return (
		<>
			
				<Nav onSelect={handleSelect} variant='pills' defaultActiveKey={currTab} justify={true} className='flex-column navbar-dark'>
					
					<div className='d-flex flex-column '>
						<Nav.Link eventKey='shipments'  className='text-white mb-4'>Current Shipments</Nav.Link>

						<Nav.Link eventKey='products' className='text-white mb-4'>Products</Nav.Link>
						
					</div>
					
					
				</Nav>
			
		</>
	)
}

export default SellerSideBar