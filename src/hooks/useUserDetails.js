import { useEffect } from "react"
import axios from "axios"

const useUserDetails = (apiUrl) => {


	const getUserDetails = async (token) => {
		
		token = 'Bearer ' + token
		console.log("TOKEN")
		console.log(token)
		const res = await axios.get(`${apiUrl}/api/users/details`, {headers : {'Authorization' : token}})
		console.log('GET USER DETAILS')
		console.log(res)

		return res.data.result
	}

	return {
		getUserDetails
	}

}

export default useUserDetails