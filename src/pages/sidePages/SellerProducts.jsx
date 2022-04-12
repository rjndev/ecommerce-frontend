import React from 'react'
import { useState, useEffect } from 'react'
import useSellerDetails from '../../hooks/useSellerDetails'
import SellerProductCard from '../../components/SellerProductCard'
import { Container, Button } from 'react-bootstrap'
import AddProductModal from '../../components/modals/AddProductModal'

function SellerProducts() {
	const [products, setProducts] = useState([])
	const [currProductForEdit, setCurrProductForEdit] = useState({})
	const [showModal, setShowModal] = useState(false)
	const [isAdd, setIsAdd] = useState(true)
	const {getSellerProducts} = useSellerDetails('localhost:4000')



	const getProducts = async () => {
		const result = await getSellerProducts(localStorage.getItem('token'))

		if(result) {
			setProducts([...result])
		}
	}

	useEffect(() => {
		getProducts()
	}, [showModal])

	return (
		<>
			<Container className='mt-2'>
				<Button onClick={() => setShowModal(true)} variant='success'>Add Product</Button>
			</Container>
			
			<Container className='mt-5'>
				{products.map((prod , i)=> {
					return (
						<SellerProductCard key={i} setCurrProductForEdit={setCurrProductForEdit} showModal={showModal} setIsAdd={setIsAdd} setShowModal={setShowModal} key={i} productDetails={prod}/>
						)
				})}
				
			</Container>

			<AddProductModal currProductForEdit={currProductForEdit} setIsAdd={setIsAdd} isAdd={isAdd} showModal={showModal} setShowModal={setShowModal}/>
		
		</>
	)
}

export default SellerProducts