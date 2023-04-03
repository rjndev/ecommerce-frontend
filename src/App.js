import logo from './logo.svg';
import {Container} from 'react-bootstrap'
import AppNavBar from './components/AppNavBar';
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register'
import ProductInfo from './pages/ProductInfo';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Logout from './pages/Logout'
import RegisterSeller from './pages/RegisterSeller';
import Footer from './pages/Footer';

import {useEffect, useState} from 'react'
import {UserProvider} from './context/UserContext'
import useUserDetails from './hooks/useUserDetails';
import useSellerDetails from './hooks/useSellerDetails';
import './App.css'
import SearchResult from './pages/SearchResult';


function App() {

	const [userData, setUserData] = useState({firstName : 'test'})
	const [userLoggedIn, setUserLoggedIn] = useState(false)
	const [isSeller, setIsSeller] = useState(false)
	const [loaded, setIsLoaded] = useState(false)
	const {getUserDetails} = useUserDetails()
	const {getSellerDetails} = useSellerDetails()

	const verifySeller = async () => {
		const data = await getSellerDetails(localStorage.getItem('token'))
		if(data != "ERROR") {
			console.log("VERIFIED SELLER!")
			setIsSeller(true)
		} else {
			console.log("VERIFIED NOT SELLER")
			setIsSeller(false)
		}
	}

	useEffect(()=> {
		let data = {}
		
		const getUser = async () => {
			if(userLoggedIn) {
				//if successful log in
				if(isSeller) {
					//User is Seller
					data = await getSellerDetails(localStorage.getItem('token'))
					console.log("DATA SELLER")
					console.log(data)

					setUserData({...data})
				} else {
					//User is Customer
					data = await  getUserDetails(localStorage.getItem('token'))
			
					console.log("DATA")
					console.log(data)
					setUserData({...data})
				}
			}
		}
		getUser()
		setIsLoaded(true)
	}, [userLoggedIn, isSeller])

	useEffect(() => {
		if(localStorage.getItem('token') !== null) {
			setUserLoggedIn(true)

			verifySeller()
		} else {
			setUserLoggedIn(false)
		}
	})

  return (
			<div style={{height : "100vh"}}>
				{loaded && 
					<UserProvider data = {{userData, setUserData, userLoggedIn, setUserLoggedIn, isSeller, setIsSeller}}>
						<Router>
							<div className='d-flex flex-column h-100 w-100'>
								<AppNavBar />
								<Routes>
									<Route exact path='/' element={<Home/>}/>
									<Route exact path='/login' element={<Login/>} />
									<Route exact path='/signup' element={<Register/>} />
									<Route exact path='/product/:id' element={<ProductInfo/>} />
									<Route exact path='/cart' element={<Cart/>} />
									<Route exact path='/logout' element={<Logout/>} />
									<Route exact path='/registerSeller' element={<RegisterSeller/>} />
									<Route exact path="/search/:searchQuery" element={<SearchResult/>} />
								</Routes>
								<Footer />
							</div>
							
						</Router>
					</UserProvider>	
				
				
				}
					
			</div>
  );
}

export default App;
