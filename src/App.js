import HomePage from './HomePage';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CryptoPage from './CryptoPage';

function App() {
	return (
		<Router>
			<div style={{ minHeight: '100vh' }}>
				<Route path="/" component={HomePage} exact />
				<Route path="/crypto/:id" component={CryptoPage} exact />
			</div>
		</Router>
	);
}

export default App;
