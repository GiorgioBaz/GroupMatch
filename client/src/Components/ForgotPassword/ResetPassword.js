import { useState } from "react";
import Axios from "axios";
import "./ResetPassword.css";
import passwordIcon from "../../Assets/password-icon.svg";

function Login() {
	const [registerPassword, setRegisterPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const updatedPass =
		registerPassword !== confirmPassword ? false : registerPassword;
	const resetPass = (e) => {
		e.preventDefault();
		if (!updatedPass) {
			console.log("Password is not the same");
			return;
		}
		Axios({
			method: "POST",
			data: {
				password: updatedPass,
			},
			withCredentials: true,
			url: "http://localhost:5000/forgotpassword",
		}).then((res) => console.log(res));
	};

	return (
		<div className="login-div">
			<div className="reset-card">
				<form className="login-form" onSubmit={resetPass}>
					<h1 className="form-header">Reset Password</h1>
					<div className="email-div">
						<div className="email-label">
							<img className="email-icon" src={passwordIcon} />
							<h3 className="form-input-headers">Password</h3>
						</div>
						<input
							className="input-field"
							placeholder="Password"
							type={"password"}
							name="email"
							onChange={(e) =>
								setRegisterPassword(e.target.value)
							}
						/>
					</div>
					<div className="password-div">
						<div className="password-label">
							<img className="password-icon" src={passwordIcon} />
							<h3 className="form-input-headers">
								Confirm Password
							</h3>
						</div>
						<input
							className="input-field"
							placeholder="Confirm Password"
							type={"password"}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className="continue-button">
						<button className="button">Continue</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
