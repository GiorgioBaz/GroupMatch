import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//Importing Components
import Login from "./Components/Login.js";
import Register from "./Components/Register/Register";

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
			</Routes>
		</BrowserRouter>
	);
}
export default App;
