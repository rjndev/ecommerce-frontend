import React from 'react'
import {useState, useEffect} from 'react'
import {Container, Form,  Card, Button} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router'
import useProductDetails from '../hooks/useProductDetails'
import useOrderDetails from '../hooks/useOrderDetails'
import Swal from 'sweetalert2'

function ProductInfo() {
	const {id} = useParams()
	const [productInfo, setProductInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const {getProductDetails} = useProductDetails()
	const {addToCart} = useOrderDetails()
	const [quantity, setQuantity] = useState(0)
	const nav = useNavigate()

	const getProduct = async () => {
		const result = await getProductDetails(id)

		setProductInfo({...result})
		setLoading(false)
	}

	

	const handleAddToCart = async () => {

		if(localStorage.getItem('token') == null) {
			Swal.fire({
				icon : 'warning',
				title : 'Oops...',
				text : 'You must be logged in to add cart. Redirecting...',
				confirmButtonText : 'Confirm'
			}).then(result => {
				if(result.isConfirmed || result.isDismissed) {
					nav('/login')
					return 
				}
			})
		} else if(quantity > 0)  {
			
			const order = {
				productId : id,
				amount : quantity
			}
			await addToCart(order, localStorage.getItem('token') )
			
			Swal.fire({
				icon: 'success',
				title: 'Success',
				confirmButtonText: 'Confirm'
			}).then(result => {
				if(result.isConfirmed || result.isDismissed) {
					nav('/cart')
				}
			})
		}
	}

	useEffect(()=> {
		getProduct()
	}, [])
	
	return (
		<>
			{loading ?

				<Container height={100} className='w-100 vh-100 mt-20 pt-20 align-items-center d-flex justify-content-around'>
		 			<img src="/images/loading.png" className='rotate' height={60} alt="loading" />
				</Container>

				:
	
				<Container fluid className='mt-5 d-flex px-5 w-100 product-info-container' >
					<Container className='lg-mt-5 lg-ms-4 product-info-img'>
						<img src={productInfo.imagePath} className='p-3' width={450} height={450} alt="pic" />
					</Container>

					<Container className='mt-5 d-flex flex-column justify-content-center'>
						<h2 className='mb-4'>{productInfo.name}</h2>
						{/* <h4 className='mb-3'>{productInfo.rating} / 5.0</h4> */}
						<p>{productInfo.description}</p>
					</Container>

					<Card className='mt-5 pt-3 me-5 w-100' style={{width: '50rem', marginTop : '100rem'}}>
						<Card.Body>
							<Card.Title>${productInfo.price}</Card.Title>
							<Card.Text className='mt-5'>Free shipping.</Card.Text>
							<Card.Text className='mb-5'>Delivery to anywhere in the Philippines only.</Card.Text>
							<div>
								<Form>
									<Form.Group className='d-flex align-items-center'>
										<Form.Label className='me-3'>Quantity</Form.Label>
										<Form.Control type='number' className='w-50' onChange={(e) => setQuantity(e.target.value)}/>
									</Form.Group>
								</Form>
							</div>
						</Card.Body>
						<Card.Footer className='d-flex justify-content-center'>
								<Button onClick={handleAddToCart}>Add to Cart</Button>
						</Card.Footer>
					</Card>
				</Container>
			}
		</>
	)
}

export default ProductInfo