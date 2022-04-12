import React, {useContext} from 'react'

const UserContext = React.createContext()

export const useUserContext = () => {
	return useContext(UserContext)
}

export const UserProvider = ({data, children}) => {
	return (
		<UserContext.Provider value={data}>
			{children}
		</UserContext.Provider>
	)
}