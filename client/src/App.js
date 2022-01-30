import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//Importing Components
import Login from "./Components/Login.js";

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
			</Routes>
		</BrowserRouter>
	);
}
export default App;
