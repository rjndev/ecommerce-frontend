import React, { useEffect, useState } from 'react'

import {Container} from 'react-bootstrap'
import ProductCard from './ProductCard'
import useProductDetails from '../hooks/useProductDetails'

function Showcase() {
	const {getRandomProducts} = useProductDetails('https://whispering-anchorage-97427.herokuapp.com')
	const [randomProducts, setRandomProducts] = useState([])

	const getProductData = async () => {
		console.log("GETTING DATA")
		const result = await getRandomProducts(5)
		setRandomProducts([...result])
	}

	useEffect(() => {
			getProductData()
	}, [])

	
	return (
		<>
			<Container fluid className='w-100 d-flex justify-content-around mt-5 mb-5 flex-wrap'>
				{randomProducts.map(prod => {
					return (
						<ProductCard key={prod._id} productDetails={prod}/>
					)
				})}
			</Container>
		</>
	)
}

export default Showcase