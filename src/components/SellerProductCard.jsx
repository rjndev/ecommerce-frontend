import React from 'react'

import { Button, Container } from 'react-bootstrap'
import {AiFillEdit} from 'react-icons/ai'
import { useEffect, useState } from 'react'

function SellerProductCard({productDetails, showModal, setIsAdd, setShowModal, setCurrProductForEdit}) {

	const handleEdit = () => {
		setIsAdd(false)
		setCurrProductForEdit({...productDetails})
		setShowModal(true)
	}

	return (
		<>
			<Container className='shadow rounded d-flex align-items-center mb-4'>
				<Container className='d-flex justify-content-center' >
					<img src={productDetails.imagePath} height={75}  alt="" />
				</Container>
				
				<Container className='py-3 d-flex'>
					<h5>{productDetails.name}</h5>

				</Container>

				<Container className='py-3'>
					<h6>Categories</h6>
					<p>{productDetails.categories.map((curr, i) => {
						let res = ''
						res += curr.name

						if(i != productDetails.categories.length - 1)
							res += ', '
						return res
					})}</p>
				</Container>

				<Container className='py-3 d-flex flex-column align-items-center'>
					<h6>Price</h6>
					<p>${productDetails.price}</p>
				</Container>

				<Container className='py-3 d-flex justify-content-center'>
					<Button onClick={handleEdit} style={{width : '5em'}}><AiFillEdit style={{fontSize : '1.35rem'}}/></Button>
				</Container>

			</Container>
		</>
	)
}

export default SellerProductCard