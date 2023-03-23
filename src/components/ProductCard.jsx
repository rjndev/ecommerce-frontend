import React from 'react'

import {Card} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function ProductCard({productDetails}) {
	const nav = useNavigate()


	return (
		<>
				<Card className='showcase-card' bg=''  border='' style={{width : '15rem', cursor : 'pointer'}} onClick={()=> nav(`/product/${productDetails._id}`)} >
					<Card.Img variant='top' className='p-3' src={productDetails.imagePath} height={200}  />
					<Card.Body>
						<Card.Title className=''>{productDetails.name}</Card.Title>
						<Card.Text>${productDetails.price}</Card.Text>
					</Card.Body>
				</Card>
		</>
	)
}

export default ProductCard