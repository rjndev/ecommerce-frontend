import { Token } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUserContext } from '../context/UserContext'


function Logout() {
	const nav = useNavigate()
	const {setUserLoggedIn, setIsSeller} = useUserContext()

	useEffect(() => {
		localStorage.removeItem('token')
		setUserLoggedIn(false)
		setIsSeller(false)
		nav('/')
	})

	return (
		<>

		</>
	)
}

export default Logout