import { useState } from "react";
import Axios from "axios";
import "./Login.css";
import background from "../Assets/background.svg";
import passwordIcon from "../Assets/password-icon.svg";
import usernameIcon from "../Assets/username-icon.svg";

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
		<div className="App" style={{ 
			backgroundImage: `url(${background})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			width: '100vw',
			height: '100vh',
			paddingTop: 0}}>
			<div>
				<div>
					<form className="form-login">
						<h1 className="form-header">Login</h1><br/><br/><br/>
						<section>
							<h3 className="form-input-headers" style={{marginTop: "10%"}}>Username</h3>
							<input className="form-box"
								style={{alignItems: "middle"}}
								placeholder="Username"
								onChange={(e) => setLoginUsername(e.target.value)}
							/>
						</section><br/><br/>
						<section>
							<h3 className="form-input-headers">Password</h3>
							<input className="form-box"
								placeholder="Password"
								onChange={(e) => setLoginPassword(e.target.value)}
							/>
						</section>
						<button className="button" onClick={login}>Continue</button>
						<p style={{position: "absolute", bottom:"0px", paddingLeft:"5%"}}>I'm a new user? Register.</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
