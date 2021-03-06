import { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";
import showLoading from "../../showLoading";
import Swal from "sweetalert2";

import "./Login.css";
import passwordIcon from "../../Assets/password-icon.svg";
import emailIcon from "../../Assets/email-icon.svg";

function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);

	const passwordErr = errorMsg && errorMsg && (
		<p className="error-p">{errorMsg}</p>
	);

	async function handleLogin() {
		setLoading(true);
		const user = await axiosInstance({
			method: "POST",
			data: {
				email: loginEmail,
				password: loginPassword,
			},
			withCredentials: true,
			url: "/login",
		}).then();
		setLoading(false);
		return {
			success: user.data?.success,
			message: user.data?.message,
			numLogins: user.data?.numLogins,
		};
	}

	const login = async (e) => {
		e.preventDefault();
		const data = await handleLogin();
		if (data.numLogins === 1) {
			setLoading(true);
			await axiosInstance({
				method: "POST",
				url: "/updateAllUsers",
				withCredentials: true,
			}).then(() => {
				setLoading(false);
				if (data.success) {
					setErrorMsg("");
					Swal.fire(`${data.message}`, "", "success").then((swal) => {
						if (swal.isConfirmed || swal.isDismissed) {
							window.location.href = "/profile";
						}
					});
				} else {
					setErrorMsg(data.message);
				}
			});
		} else if (data.numLogins > 1) {
			setLoading(true);
			await axiosInstance({
				method: "POST",
				url: "/updateAllUsers",
				withCredentials: true,
			}).then(() => {
				setLoading(false);
				if (data.success) {
					setErrorMsg("");
					Swal.fire(`${data.message}`, "", "success").then((swal) => {
						if (swal.isConfirmed || swal.isDismissed) {
							window.location.href = "/mainpage";
						}
					});
				} else {
					setErrorMsg(data.message);
				}
			});
		}
	};

	useEffect(() => {
		showLoading(loading);
	}, [loading]);

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
							<div className="password-icon-label">
								<img
									alt="Password Icon"
									className="password-icon"
									src={passwordIcon}
								/>
								<h3 className="form-input-headers">Password</h3>
							</div>
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
