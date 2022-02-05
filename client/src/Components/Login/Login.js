import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import passwordIcon from "../../Assets/password-icon.svg";
import emailIcon from "../../Assets/email-icon.svg";

function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const login = (e) => {
		e.preventDefault();
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

	return (
		<div className="login-div">
			<div className="login-card">
				<form className="login-form" onSubmit={login}>
					<h1 className="form-header">Log In</h1>

					<div className="email-div">
						<div className="email-label">
							<img className="email-icon" src={emailIcon} />
							<h3 className="form-input-headers">Email</h3>
						</div>
						<input
							className="input-field"
							placeholder="Email"
							name="email"
							onChange={(e) =>
								setLoginEmail(
									e.target.value.toString().toLowerCase()
								)
							}
							required
						/>
					</div>

					<div className="password-div">
						<div className="password-label">
							<img className="password-icon" src={passwordIcon} />
							<h3 className="form-input-headers">Password</h3>
						</div>
						<input
							className="input-field"
							placeholder="Password"
							type={"password"}
							onChange={(e) => setLoginPassword(e.target.value)}
							required
							minLength="8"
						/>
					</div>

					<div className="continue-button">
						<button className="button">Continue</button>
					</div>

					<p className="register-p">
						I'm a new user?
						<Link to="/register" className="register-span">
							Register
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
