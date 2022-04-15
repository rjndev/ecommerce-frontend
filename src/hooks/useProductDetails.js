import axios from 'axios'


const useProductDetails = (apiUrl) => {

	const getRandomProducts = async (size) => {
		const res = await axios.post(`${apiUrl}/api/products/details/random`, {size : size})

		return res.data.result
	}

	const getProductDetails = async (id) => {
		const res = await axios.get(`${apiUrl}/api/products/details/${id}`)

		console.log("PRODUCT DETAIL!")
		console.log(res)

		return res.data.result
	}

	const getCategories = async() => {
		const res = await axios.get(`${apiUrl}/api/products/categories/all`)
	
		console.log('GETTING ALL CATEGORIES')
		console.log(res)

		return res.data.result
	}

	const addProduct = async(token, data) => {
		token = 'Bearer ' + token
		
		const res = await axios.post(`${apiUrl}/api/products/create`, data , {headers: {'Authorization' : token}})

		console.log("ADDING PRODUCT")
		console.log(res)

		

		return res.data.result
		
	}

	const editProduct = async(token, productId, data) => {
		token = 'Bearer '+ token
		const res = await axios.put(`${apiUrl}/api/products/details/${productId}/update`, data, {headers: {'Authorization' : token}} ) 

		console.log("EDITING PRODUCT")
		console.log(res)
		return res.data.result
	}

	return {
		getRandomProducts,
		getProductDetails,
		getCategories,
		addProduct,
		editProduct
	}

}


export default useProductDetails