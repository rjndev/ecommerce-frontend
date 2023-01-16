import React, { useEffect, useState } from 'react'

import {Container} from 'react-bootstrap'
import ProductCard from './ProductCard'
import useProductDetails from '../hooks/useProductDetails'

function Showcase() {
	const {getRandomProducts} = useProductDetails('https://amazonia-backend.onrender.com')
	const [randomProducts, setRandomProducts] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const getProductData = async () => {
		console.log("GETTING DATA")
		const result = await getRandomProducts(5)
		setIsLoading(false);
		setRandomProducts([...result])
	}

	useEffect(() => {
			getProductData()
			
	}, [])

	
	return (
		<>
			{isLoading ? 
			(<Container height={100} className='w-100 h-[32rem] pt-5 d-flex justify-content-around'>
				<img src="images/loading.png" className='rotate' height={60} alt="" />
			</Container>) 
			:
			<Container fluid className='w-100 d-flex justify-content-around mt-5 mb-5 flex-wrap'>
				{randomProducts.map(prod => {
					return (
						<ProductCard key={prod._id} productDetails={prod}/>
					)
				})}
			</Container>
			
			}
			
		</>
	)
}

export default Showcase