import { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import showLoading from "../../showLoading";
import Swal from "sweetalert2";

import "./ResetPassword.css";
import emailIcon from "../../Assets/email-icon.svg";

function ForgotPassword() {
	const [resetEmail, setResetEmail] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);

	const emailError = errorMsg && <p className="error-p">{errorMsg}</p>;

	const forgotPass = (e) => {
		e.preventDefault();
		setLoading(true);
		axiosInstance({
			method: "POST",
			data: {
				email: resetEmail,
			},
			withCredentials: true,
			url: "/forgotpassword",
		}).then((res) => {
			setLoading(false);
			if (res.data.success) {
				setErrorMsg("");
				Swal.fire(
					`${res.data.message}`,
					"Please check your inboxes including spam",
					"success"
				).then((swal) => {
					if (swal.isConfirmed || swal.isDismissed) {
						window.location.href = "/";
					}
				});
			} else {
				setErrorMsg(res.data.message);
			}
		});
	};

	useEffect(() => {
		showLoading(loading);
	}, [loading]);

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

export default ForgotPassword;
