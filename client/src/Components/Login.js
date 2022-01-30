import { useState } from "react";
import Axios from "axios";
import "./Login.css";
import background from "../Assets/background.svg";

function Login() {
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [data, setData] = useState(null);

	const register = () => {
		Axios({
			method: "POST",
			data: {
				username: registerUsername,
				password: registerPassword,
			},
			withCredentials: true,
			url: "http://localhost:5000/register",
		}).then((res) => console.log(res));
	};

	const login = () => {
		Axios({
			method: "POST",
			data: {
				username: loginUsername,
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
			url: "http://localhost:5000/user",
		}).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	};

	const logout = () => {
		Axios({
			method: "POST",
			data: {
				username: loginUsername,
				password: loginPassword,
			},
			withCredentials: true,
			url: "http://localhost:5000/logout",
		}).then((res) => console.log(res));
		//May need a window relocation once the page is fully developed
	};

	return (
		<div className="App">
			<div>
				<h1>Register</h1>
				<input
					placeholder="username"
					onChange={(e) => setRegisterUsername(e.target.value)}
				/>
				<input
					placeholder="password"
					onChange={(e) => setRegisterPassword(e.target.value)}
				/>
				<button onClick={register}>Submit</button>
			</div>

			<div>
				<h1>Login</h1>
				<input
					placeholder="username"
					onChange={(e) => setLoginUsername(e.target.value)}
				/>
				<input
					placeholder="password"
					onChange={(e) => setLoginPassword(e.target.value)}
				/>
				<button onClick={login}>Submit</button>
			</div>

			<div>
				<h1>Get User</h1>
				<button onClick={getUser}>Submit</button>
				{data ? <h1>Welcome Back {data.username}</h1> : null}
			</div>
			<button onClick={logout}>Log Out</button>
		</div>
	);
}

export default Login;
