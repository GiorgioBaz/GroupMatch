import { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import showLoading from "../../showLoading";
import Swal from "sweetalert2";

import "./ResetPassword.css";
import passwordIcon from "../../Assets/password-icon.svg";
import emailIcon from "../../Assets/email-icon.svg";

function ResetPassword() {
	const [resetPassword, setResetPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [resetEmail, setResetEmail] = useState("");
	const [resetCode, setResetCode] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);

	const emailErr = errorMsg &&
		errorMsg.includes("incorrect spelling or missing characters") && (
			<p className="error-p">{errorMsg}</p>
		);

	const resetCodeErr = errorMsg &&
		errorMsg.includes("Incorrect reset code") && (
			<p className="error-p">{errorMsg}</p>
		);

	const passMismatchErr = resetPassword !== confirmPassword && (
		<p className="error-p">Passwords are not the same</p>
	);

	const resetPass = (e) => {
		e.preventDefault();

		if (resetPassword === confirmPassword) {
			setLoading(true);
			axiosInstance({
				method: "POST",
				data: {
					email: resetEmail,
					password: resetPassword,
					resetCode: resetCode,
				},
				withCredentials: true,
				url: "/forgotpassword",
			}).then((res) => {
				setLoading(false);
				if (res.data.success) {
					setErrorMsg("");
					Swal.fire({
						title: "Success",
						text: `${res.data.message}`,
						icon: "success",
						confirmButtonText: "Log In",
					}).then((swal) => {
						if (swal.isConfirmed || swal.isDismissed) {
							window.location.href = "/";
						}
					});
					//setErrorMsg(res.data.message);
				} else {
					setErrorMsg(res.data.message);
				}
			});
		}
	};

	useEffect(() => {
		showLoading(loading);
	}, [loading]);

	return (
		<div className="reset-div">
			<div className="reset-card">
				<form className="reset-form" onSubmit={resetPass}>
					<h1 className="form-header">Reset Password</h1>
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
							autoComplete="off"
						/>
					</div>
					{emailErr}
					<div className="password-div">
						<div className="password-label">
							<img
								alt="Password Icon"
								className="password-icon"
								src={passwordIcon}
							/>
							<h3 className="form-input-headers">New Password</h3>
						</div>
						<input
							className="input-field"
							placeholder="Password"
							type={"password"}
							name="email"
							onChange={(e) => setResetPassword(e.target.value)}
							required
							minLength="8"
							autoComplete="off"
						/>
					</div>

					{passMismatchErr}

					<div className="password-div">
						<div className="password-label">
							<img
								alt="Password Icon"
								className="password-icon"
								src={passwordIcon}
							/>
							<h3 className="form-input-headers">
								Confirm Password
							</h3>
						</div>
						<input
							className="input-field"
							placeholder="Confirm Password"
							type={"password"}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							minLength="8"
							autoComplete="off"
						/>
					</div>

					{passMismatchErr}

					<div className="resetcode-div">
						<div className="resetcode-label">
							<img
								alt="Password Icon"
								className="password-icon"
								src={passwordIcon}
							/>
							<h3 className="form-input-headers">Reset Code</h3>
						</div>
						<input
							className="input-field"
							type="text"
							onChange={(e) => setResetCode(e.target.value)}
							name="Reset Code"
							placeholder="Password Reset Code"
							required
							autoComplete="off"
						/>
					</div>

					{resetCodeErr}

					<div className="continue-button">
						<button className="reset-button">Continue</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword;
