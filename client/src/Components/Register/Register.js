import { useState } from "react";
import Axios from "axios";
import "./Register.css";
import background from "../../Assets/background.svg";

function Login() {
	const [registerPassword, setRegisterPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [registerName, setRegisterName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [data, setData] = useState(null);

	const register = () => {
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
		}).then((res) => console.log(res));
	};

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

	return (
		<div className="App">
			<div className="register">
				<h1>Register</h1>
				<input
					placeholder="FullName"
					onChange={(e) => setRegisterName(e.target.value.toString())}
				/>
				<input
					placeholder="Email"
					onChange={(e) =>
						setRegisterEmail(
							e.target.value.toString().toLowerCase()
						)
					}
				/>
				<input
					placeholder="Password"
					type={"password"}
					onChange={(e) => setRegisterPassword(e.target.value)}
				/>
				<input
					placeholder="Confirm Password"
					type={"password"}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button onClick={register}>Submit</button>
			</div>

			<div>
				<h1>Get User</h1>
				<button onClick={getUser}>Submit</button>
				{data ? <h1>Welcome Back {data.fullName}</h1> : null}
			</div>
		</div>
	);
}

export default Login;
