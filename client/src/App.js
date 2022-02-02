import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//Importing Components
import Login from "./Components/Login/Login.js";
import Register from "./Components/Register/Register";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div className="App">
							<Login />
						</div>
					}
				/>
				<Route
					path="/register"
					element={
						<div className="App">
							<Register />
						</div>
					}
				/>
				<Route
					path="/forgotpassword"
					element={
						<div className="App">
							<ForgotPassword />
						</div>
					}
				/>
				<Route
					path="/resetpassword"
					element={
						<div className="App">
							<ResetPassword />
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
