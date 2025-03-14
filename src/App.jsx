import Register from "../src/components/RegistrationForm/RegisterForm.jsx";
import Login from "../src/components/LoginForm/LoginForm.jsx";
import SearchProducts from "./components/SearchProducts.jsx";

import "./App.css";

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
