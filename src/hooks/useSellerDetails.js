import axios from 'axios'
import apiConstants from './apiConstants'

const useSellerDetails = () => {


	const getSellerDetails = async ( token) => {
		token = 'Bearer ' + token

		const res = await axios.get(`${process.env.REACT_APP_PROD_URL}/api/seller/details`, {headers : {'Authorization' : token}})

		console.log("SELLER DETAIL")
		console.log(res)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result
	}

	const getSellerProducts = async (token) => {
		token = 'Bearer ' + token
		const res = await axios(`${process.env.REACT_APP_PROD_URL}/api/seller/details`, {headers : {'Authorization' : token}})

		console.log("SELLER PRODUCTS")
		console.log(res)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result
	}

	return {
		getSellerDetails,
		getSellerProducts
	}


}


export default useSellerDetails