import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./Login.css";
import passwordIcon from "../../Assets/password-icon.svg";
import emailIcon from "../../Assets/email-icon.svg";

function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const passwordErr = errorMsg && errorMsg && (
		<p className="error-p">{errorMsg}</p>
	);

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
		}).then((res) => {
			if (res.data.success) {
				Swal.fire(`${res.data.message}`, "", "success").then((swal) => {
					if (swal.isConfirmed || swal.isDismissed) {
						window.location.href = "/";
					}
				});
			} else {
				setErrorMsg(res.data.message);
			}
		});
	};

	return (
		<div className="login-div">
			<div className="login-card">
				<form className="login-form" onSubmit={login}>
					<h1 className="form-header">Log In</h1>

					<div className="email-div">
						<div className="email-label">
							<img
								alt="Email Icon"
								className="email-icon"
								src={emailIcon}
							/>
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
							<img
								alt="Password Icon"
								className="password-icon"
								src={passwordIcon}
							/>
							<h3 className="form-input-headers">Password</h3>
							<Link
								to="/forgotpassword"
								className="resetpass-span"
							>
								Forgot your password?
							</Link>
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

					{passwordErr}

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
