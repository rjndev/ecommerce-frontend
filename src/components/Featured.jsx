import React from 'react'
import {Container, Carousel} from 'react-bootstrap'

function Featured() {
	return (
		<>
			<Container  fluid className='w-75'>
				<Carousel fade className='h-100'>
					<Carousel.Item >
						<img src="images/products/hyperx.jpg" className='w-100' height={600} alt="" />
					</Carousel.Item>

					<Carousel.Item  >
						<img src="images/products/lenovo.jpg" className='w-100' height={600} alt="" />
					</Carousel.Item>
				</Carousel>
			</Container>
		</>
	)
}

export default Featured