import React from 'react'
import {Container, Table, Button} from 'react-bootstrap'
import useOrderDetails from '../hooks/useOrderDetails'
import { useState, useEffect, useLayoutEffect } from 'react'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import EditProductModal from '../components/modals/EditProductModal'
import {useUserContext} from '../context/UserContext'

function Cart() {
	const [orderDetails, setOrderDetails] = useState({})
	const [loaded, setLoaded] = useState(false)
	const {getUserOrder, deleteProduct} = useOrderDetails('localhost:4000')
	const [valueRefresh , setValueRefresh] = useState(true)
	const nav =  useNavigate()

	const [showModal, setShowModal] = useState(false)
	const [currProdName, setCurrProdName] = useState('')
	const [currProdIndex, setCurrProdIndex] = useState(0)
	const [currQuantity, setCurrQuantity] = useState(0)

	const {userLoggedIn, isSeller} = useUserContext()
	
	const handleEditProduct = (id, productName, quantity) => {
		setCurrProdName(productName)
		setCurrProdIndex(id)
		setCurrQuantity(quantity)
		console.log("EDIT PRODUCT MODAL")
		setShowModal(true)
	}

	const editQuantity = async () => {

	}

	const handleDeleteProduct = async (id) => {
		Swal.fire({
			icon : 'question',
			title: 'Are you sure?',
			text: 'This will delete the product from your order.',
			confirmButtonText : 'Confirm',
			showDenyButton : 'Cancel'
		}).then(res => {
			if(res.isConfirmed) {
				deleteProduct(localStorage.getItem('token'), id).then(result => {
					if(result) {
						Swal.fire({
							icon : 'success',
							title : 'Success!',
							text : 'Successfully deleted product from order.',
							confirmButtonText : 'Confirm'
						}).then(result2 => {
							if(result2.isConfirmed || result2.isDismissed) {
								setValueRefresh(prev => !prev)
							}
						})
					}
				})
			}
		})
	}

	const getOrder = async () => {
		console.log("GETTTT ORDER")
		let result = await getUserOrder(localStorage.getItem('token'))
		setOrderDetails({...result})
		setLoaded(true)
	}
	
	useEffect(()=> {
		getOrder()
	}, [valueRefresh])

	useEffect(() => {
		if(!userLoggedIn || isSeller) {
			return nav('/')
		}	
	})

	
	return (
		<>
			{loaded &&
			
				<Container className='vh-100 w-100 d-flex justify-content-center align-items-center'>
					<Table striped bordered hover className=''>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Sub-Total</th>
							</tr>
						</thead>
						<tbody>
						
						{orderDetails.products?.map((product, i) => {
								const prodDetail = orderDetails.productDetails.find(curr => curr._id.toString() == product.productId )

								return (

									<tr key={i}>
										<td>{prodDetail.name}</td>
										<td>{prodDetail.price}</td>
										<td>{product.amount}</td>
										<td>{prodDetail.price * product.amount}</td>
										<td width={20}>
											<Button onClick={() => handleEditProduct(i, prodDetail.name, product.amount)} variant='light' className=''><AiFillEdit/></Button>
										</td>
										<td width={20}>
											<Button onClick={() => handleDeleteProduct(i)} variant='light' className=''><AiFillDelete/></Button>
										</td>
										
									</tr>
								)
							})}
						<tr>
							<td></td>
							<td></td>
							<th>Total: </th>
							<th>{orderDetails.totalAmount}</th>
							<td></td>

						</tr>
						</tbody>
					</Table>
				</Container>
			}
			

			<EditProductModal showModal={showModal} setShowModal={setShowModal} productName={currProdName} editQuantity={editQuantity} index={currProdIndex} setValueRefresh = {setValueRefresh} />
		</>
	)
}

export default Cart