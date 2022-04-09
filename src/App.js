import logo from './logo.svg';
import {Container} from 'react-bootstrap'
import AppNavBar from './components/AppNavBar';
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'


function App() {
  return (
			<>
				<Router>
					<AppNavBar />
					<Routes>
						<Route exact path='/login' element={<Login/>} />
						<Route exact path='/signup' element={<Register/>} />
					</Routes>
				</Router>
			
			</>
			
  );
}

export default App;
