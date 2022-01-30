import { useState } from "react";
import Axios from "axios";
import "./Login.css";
import background from "../Assets/background.svg";

function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [data, setData] = useState(null);

	const login = () => {
		Axios({
			method: "POST",
			data: {
				email: loginEmail,
				password: loginPassword,
			},
			withCredentials: true,
			url: "http://localhost:5000/login",
		}).then((res) => console.log(res));
	};

	const getUser = () => {
		Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/currentUser",
		}).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	};

	const logout = () => {
		Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/logout",
		}).then((res) => console.log(res));
		//May need a window relocation once the page is fully developed
	};

	return (
		<div className="App">
			<div>
				<h1>Login</h1>
				<input
					placeholder="Email"
					name="email"
					onChange={(e) =>
						setLoginEmail(e.target.value.toString().toLowerCase())
					}
				/>
				<input
					placeholder="Password"
					type={"password"}
					onChange={(e) => setLoginPassword(e.target.value)}
				/>
				<button onClick={login}>Submit</button>
			</div>

			<div>
				<h1>Get User</h1>
				<button onClick={getUser}>Submit</button>
				{data ? <h1>Welcome Back {data.name}</h1> : null}
			</div>
			<button onClick={logout}>Log Out</button>
		</div>
	);
}

export default Login;
