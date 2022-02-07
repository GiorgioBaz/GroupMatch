import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";
import passwordIcon from "../../Assets/password-icon.svg";
import emailIcon from "../../Assets/email-icon.svg";
import userIcon from "../../Assets/user-icon.svg";

function Login() {
	const [registerPassword, setRegisterPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [registerName, setRegisterName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	//const [data, setData] = useState(null);

	const register = (e) => {
		e.preventDefault();
		if (registerPassword !== confirmPassword) {
			console.log("Password is not the same");
			return;
		}
		Axios({
			method: "POST",
			data: {
				name: registerName,
				email: registerEmail,
				password: registerPassword,
			},
			withCredentials: true,
			url: "http://localhost:5000/register",
		}).then((res) => setErrorMsg(res.data.message));
	};
	/*
	const getUser = () => {
		Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/currentUser",
		}).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	};

	const logout = () => {
		Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/logout",
		}).then((res) => console.log(res));
		//May need a window relocation once the page is fully developed
	};
	*/
	return (
		<div className="register-div">
			<div className="register-card">
				<form className="register-form" onSubmit={register}>
					<h1 className="register-header">Register</h1>
					<div className="name-div">
						<div className="name-label">
							<img
								alt="User Icon"
								className="user-icon"
								src={userIcon}
							/>
							<h3 className="form-input-headers">Full Name</h3>
						</div>
						<input
							className="input-field"
							placeholder="Full Name"
							onChange={(e) =>
								setRegisterName(e.target.value.toString())
							}
						/>
					</div>

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
								setRegisterEmail(
									e.target.value.toString().toLowerCase()
								)
							}
						/>
						{errorMsg != undefined &&
						errorMsg.includes(
							"email"
						) && <p className="error-p">{errorMsg}</p>}
					</div>

					<div className="password-div">
						<div className="password-label">
							<img
								alt="Password Icon"
								className="password-icon"
								src={passwordIcon}
							/>
							<h3 className="form-input-headers">Password</h3>
						</div>
						<input
							className="input-field"
							placeholder="Password"
							type={"password"}
							onChange={(e) =>
								setRegisterPassword(e.target.value)
							}
						/>
						{errorMsg != undefined &&
						errorMsg.includes(
							"Passwords"
						) && <p className="error-p">{errorMsg}</p>}
					</div>

					<div className="confirmpass-div">
						<div className="confirmpass-label">
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
						/>
					</div>

					<div className="create-button">
						<button className="button">Create Account</button>
					</div>

					<p className="register-p">
						Have an account?
						<Link to="/" className="register-span">
							Login
						</Link>
					</p>
				</form>
			</div>
			{/*
			<div>
				<h1>Get User</h1>
				<button onClick={getUser}>Submit</button>
				{data ? <h1>Welcome Back {data.name}</h1> : null}
			</div>

			<button onClick={logout}>Log Out</button>
			*/}
		</div>
	);
}

export default Login;
