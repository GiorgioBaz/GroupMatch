import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

import "./ResetPassword.css";
import emailIcon from "../../Assets/email-icon.svg";

function Login() {
	const [resetEmail, setResetEmail] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

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
					if (swal.isConfirmed) {
						window.location.href = "/";
					}
				});
			}
			setErrorMsg(res.data.message);
		});
	};
	console.log(errorMsg);
	return (
		<div className="login-div">
			<div className="forgot-card">
				<form className="login-form" onSubmit={forgotPass}>
					<h1 className="form-header">Forgot Password</h1>
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
								setResetEmail(
									e.target.value.toString().toLowerCase()
								)
							}
						/>
					</div>
					{errorMsg != undefined &&
						errorMsg.includes(
							"incorrect spelling or missing characters"
						) && <p className="error-p">{errorMsg}</p>}

					<div className="continue-button">
						<button className="button">Continue</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;