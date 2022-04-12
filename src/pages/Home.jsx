import React from 'react'
import Featured from '../components/Featured'
import Showcase from '../components/Showcase'

import UserHome from './UserHome'
import SellerDashboard from './SellerDashboard'
import { useUserContext } from '../context/UserContext'

function Home() {
	const {isSeller} = useUserContext()
	
	return (
		<>
			{isSeller == true ? 
			
				<SellerDashboard />
				:
				<UserHome />
			}
		</>
	)
}

export default Home