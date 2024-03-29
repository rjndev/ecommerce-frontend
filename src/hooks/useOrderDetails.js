
import axios from "axios"
import apiConstants from './apiConstants'


const useOrderDetails = () => {


	const getUserOrder = async (token) => {
		token = 'Bearer ' + token
		const res = await axios.get(`${process.env.REACT_APP_PROD_URL}/api/users/myOrders`, {headers : {'Authorization' : token}})
	
		console.log("GET USER ORDERS")
		console.log(res)

		if(res.data.code === apiConstants.codeERROR)
			return apiConstants.codeERROR

		return res.data.result
	}

	const addToCart = async (order, token) => {
		console.log("TOKENX")
		
		token = 'Bearer ' + token
		console.log(token)
		const res = await axios.post(`${process.env.REACT_APP_PROD_URL}/api/users/addToCart`, order,  {headers : {'Authorization' : token}})

		console.log("ADDING TO CART")
		console.log(res)
	}

	const deleteProduct = async(token,  index) => { 
		token = 'Bearer ' + token 
		const res = await axios.delete(`${process.env.REACT_APP_PROD_URL}/api/users/myOrders/deleteProduct`, {headers : {'Authorization' : token}, data : {index : index}})
		
		console.log("DELETING PRODUCT")
		console.log(res)

		if(res.data.code === apiConstants.codeERROR)
			return apiConstants.codeERROR

		return res.data.result

	}

	const editProductQuantity = async(token, index, quantity) => {
		token = 'Bearer ' + token
		const res = await axios.put(`${process.env.REACT_APP_PROD_URL}/api/users/myOrders/editProductQuantity`, {index : index, quantity : quantity},  {headers : {'Authorization' : token}})
	
		console.log("EDITING PROD QUANTITY")
		console.log(res)

		if(res.data.code === apiConstants.codeERROR)
			return apiConstants.codeERROR

		return res.data.result
	}

	const getProductsFromOrder = async(token) => {
		token = 'Bearer ' + token
		const res = await axios.get(`${process.env.REACT_APP_PROD_URL}/api/seller/productsFromOrder`, {headers : {'Authorization' : token}})

		console.log("GETTING PRODUCTS FROM ORDER")
		console.log(res)

		if(res.data.code === apiConstants.codeERROR)
			return apiConstants.codeERROR

		return res.data.result
	}

	const payOutOrder = async (token, orderId) => {
		token = 'Bearer ' + token
		const data = {
			orderId
		}
		const res = await axios.post(`${process.env.REACT_APP_PROD_URL}/api/users/payCart`, data, {headers : {'Authorization' : token}})


		console.log('PAYING OUT OIRDER')
		console.log(res)

		if(res.data.code === apiConstants.codeERROR)
			return apiConstants.codeERROR

		return res.data.result
	}
	return {
		getUserOrder,
		addToCart,
		deleteProduct,
		editProductQuantity,
		getProductsFromOrder,
		payOutOrder
	}
}

export default useOrderDetails