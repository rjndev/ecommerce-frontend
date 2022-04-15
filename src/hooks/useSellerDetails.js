import axios from 'axios'


const useSellerDetails = (apiUrl) => {


	const getSellerDetails = async ( token) => {
		token = 'Bearer ' + token

		const res = await axios.get(`${apiUrl}/api/seller/details`, {headers : {'Authorization' : token}})

		console.log("SELLER DETAIL")
		console.log(res)
		return res.data.result
	}

	const getSellerProducts = async (token) => {
		token = 'Bearer ' + token
		const res = await axios(`${apiUrl}/api/seller/details`, {headers : {'Authorization' : token}})

		console.log("SELLER PRODUCTS")
		console.log(res)

		return res.data.result.products
	}

	return {
		getSellerDetails,
		getSellerProducts
	}


}


export default useSellerDetails