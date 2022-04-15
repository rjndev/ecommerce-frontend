import {useState, useEffect} from 'react'
import axios from 'axios'

const useAuthenticate = (apiUrl)  => {


	const login = async (userData) => {
		const data = {
			email : userData.email,
			password : userData.password
		}

		console.log("LOGIN")
		const res = await axios.post(`${apiUrl}/api/users/login`, data)

		if(res.data.result == 'WC') {
			return false
		} else if(res.data.result) {
			return res.data.result
		}
		console.log(res)
	}

	const loginSeller = async(userData) => {
		const data = {
			email : userData.email,
			password : userData.password
		}

		const res = await axios.post(`${apiUrl}/api/seller/login`, data)

		if(res.data.result == 'WC') {
			return false
		} else if(res.data.result) {
			return res.data.result
		}

		
	}

	const register = async (userData) => {
		const data = {
			firstName : userData.firstName,
			lastName : userData.lastName,
			email : userData.email,
			password : userData.password
		}
		console.log("REGISTERING")
		const res = await axios.post(`${apiUrl}/api/users/register`, data)
		
		console.log(res)

		if(res.data.result == "OK") {
			return true
		} else if(res.data.result == "EA") {
			return false
		} else {
			return "ERR"
		}
	}

	const registerSeller = async (userData) => {
		const data = {
			storeName : userData.storeName,
			email : userData.email,
			password : userData.password
		}

		console.log("REGISTERING SELLER")
		const res = await axios.post(`${apiUrl}/api/seller/create`, data)

		console.log(res)
		if(res.data.result === "OK") {
			return true 
		} else if(res.data.result === "EA") {
			return false
		} else {
			return "ERR"
		}

	}

	return {
		login,
		register,
		loginSeller,
		registerSeller
	}
}

export default useAuthenticate

