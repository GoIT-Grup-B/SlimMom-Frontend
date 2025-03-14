import Register from "./components/AuthNav/RegistrationForm/Register.jsx";
import Login from "./components/AuthNav/LoginForm/Login.jsx";

import "./App.css";
import SearchProducts from "./components/SearchProducts.jsx";

function App() {
	return (
		<>
			<div>
				<Register />
				<Login />
				<SearchProducts />
			</div>
		</>
	);
}

export default App;
