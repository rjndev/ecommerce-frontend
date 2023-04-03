import { useEffect } from "react"
import axios from "axios"
import apiConstants from "./apiConstants"

const useUserDetails = () => {


	const getUserDetails = async (token) => {
		
		token = 'Bearer ' + token
		console.log("TOKEN")
		console.log(token)
		const res = await axios.get(`${process.env.REACT_APP_PROD_URL}/api/users/details`, {headers : {'Authorization' : token}})
		console.log('GET USER DETAILS')
		console.log(res)

		if(res.data.code !== apiConstants.codeOK)
			return apiConstants.codeERROR

		return res.data.result
	}

	return {
		getUserDetails
	}

}

export default useUserDetails