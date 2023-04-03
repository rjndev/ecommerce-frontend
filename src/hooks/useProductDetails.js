import axios from 'axios'
import apiConstants from './apiConstants'


const useProductDetails = () => {

	const getRandomProducts = async (size) => {
		const res = await axios.post(`${process.env.REACT_APP_PROD_URL}/api/products/details/random`, {size : size})

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result
	}

	const getSearchProduct = async(textSearch) => {
		const res = await axios.get(`${process.env.REACT_APP_PROD_URL}/api/products/search/${textSearch}`)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result;
	}

	const getProductDetails = async (id) => {
		const res = await axios.get(`${process.env.REACT_APP_PROD_URL}/api/products/details/${id}`)

		console.log("PRODUCT DETAIL!")
		console.log(res)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result
	}

	const getCategories = async() => {
		const res = await axios.get(`${process.env.REACT_APP_PROD_URL}/api/products/categories/all`)
	
		console.log('GETTING ALL CATEGORIES')
		console.log(res)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result
	}

	const addProduct = async(token, data) => {
		token = 'Bearer ' + token
		
		const res = await axios.post(`${process.env.REACT_APP_PROD_URL}/api/products/create`, data , {headers: {'Authorization' : token}})

		console.log("ADDING PRODUCT")
		console.log(res)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.code
		
	}


	const editProduct = async(token, productId, data) => {
		token = 'Bearer '+ token
		const res = await axios.put(`${process.env.REACT_APP_PROD_URL}/api/products/details/${productId}/update`, data, {headers: {'Authorization' : token}} ) 

		console.log("EDITING PRODUCT")
		console.log(res)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result
	}

	return {
		getRandomProducts,
		getProductDetails,
		getCategories,
		addProduct,
		editProduct,
		getSearchProduct
	}

}


export default useProductDetails