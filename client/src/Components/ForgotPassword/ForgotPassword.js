import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

import "./ResetPassword.css";
import emailIcon from "../../Assets/email-icon.svg";

function Login() {
	const [resetEmail, setResetEmail] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const emailError = errorMsg && <p className="error-p">{errorMsg}</p>;

	const forgotPass = (e) => {
		e.preventDefault();
		Axios({
			method: "POST",
			data: {
				email: resetEmail,
			},
			withCredentials: true,
			url: "http://localhost:5000/forgotpassword",
		}).then((res) => {
			if (res.data.success) {
				Swal.fire(
					`${res.data.message}`,
					"Please check your inboxes including spam",
					"success"
				).then((swal) => {
					if (swal.isConfirmed || swal.isDismissed) {
						window.location.href = "/";
					}
				});
			}
			setErrorMsg(res.data.message);
		});
	};
	console.log(errorMsg);
	return (
		<div className="forgot-div">
			<div className="forgot-card">
				<form className="forgot-form" onSubmit={forgotPass}>
					<h1 className="form-header">Forgot Password</h1>
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
								setResetEmail(
									e.target.value.toString().toLowerCase()
								)
							}
							required
						/>
					</div>

					{emailError}

					<div className="continue-button">
						<button className="forgot-button">Continue</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
