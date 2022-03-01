import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

import "./Profile.css";
import emailIcon from "../../Assets/email-icon.svg";
import userIcon from "../../Assets/user-icon.svg";
import academicsIcon from "../../Assets/academics-icon.svg";
import blankUserIcon from "../../Assets/blank-profile-temp.png";

function Profile() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [academics, setAcademics] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	async function getUserInfo() {
		try {
			Axios({
				method: "GET",
				withCredentials: true,
				url: "http://localhost:5000/currentUser",
			}).then((res) => {
				setUsername(res.data.name);
				setEmail(res.data.email);
				setAcademics(res.data.grades);
			});
		} catch (error) {
			console.error(error);
			Swal.fire("Error", "Please Log In To Your Account Again", "error");
		}
	}
	useEffect(() => {
		getUserInfo();
	}, []);

	function updateUserInfo(e) {
		e.preventDefault();
		const user = getUserInfo();
		// Axios({
		// 	method: "POST",
		// 	data: {
		// 		email: email,
		// 		name: username,
		// 		grades: academics
		// 	},
		// 	withCredentials: true,
		// 	url: "http://localhost:5000/userprofile",
		// }).then((res) => {
		// 	if (res.data.success) {
		// 		Swal.fire(`${res.data.message}`, "", "success").then((swal) => {
		// 			if (swal.isConfirmed || swal.isDismissed) {
		// 				window.location.href = "/mainpage";
		// 			}
		// 		});
		// 	} else {
		// 		setErrorMsg(res.data.message);
		// 	}
		// });
	}
	return (
		<div className="profile-div">
			<div className="profile-card">
				<h2 className="student-header">Student Name</h2>
				<form className="profile-form" onSubmit={updateUserInfo}>
					<img
						alt="Student Profile"
						className="student-photo"
						src={blankUserIcon}
					/>
					<div className="profile-form-inputs">
						<div className="username-div">
							<div className="username-label">
								<img
									alt="User Icon"
									className="username-icon"
									src={userIcon}
								/>
								<h3 className="profile-header">Username</h3>
							</div>
							<input
								className="profile-input"
								placeholder="Username Here"
								value={username || ""}
								onChange={(e) => setUsername(e.target.value)}
							></input>
						</div>

						<div className="email-div">
							<div className="profile-email-label">
								<img
									alt="Email Icon"
									className="profile-email-icon"
									src={emailIcon}
								/>
								<h3 className="profile-header">Email</h3>
							</div>
							<input
								className="profile-input"
								placeholder="Email"
								name="email"
								value={email || ""}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="academics-div">
							<div className="academics-label">
								<img
									alt="Academics Icon"
									className="academics-icon"
									src={academicsIcon}
								/>
								<h3 className="profile-header">Academics</h3>
							</div>
							<textarea
								className="profile-input"
								placeholder="Subjects Here"
								type={"textarea"}
								value={academics || ""}
								onChange={(e) => setAcademics(e.target.value)}
							></textarea>
						</div>
					</div>
					<div className="profile-buttons">
						<button type="button" className="cancel-button">
							Cancel
						</button>
						<button type="submit" className="submit-button">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Profile;
