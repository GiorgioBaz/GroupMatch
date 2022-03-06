import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

import "./Profile.css";
import emailIcon from "../../Assets/email-icon.svg";
import userIcon from "../../Assets/user-icon.svg";
import academicsIcon from "../../Assets/academics-icon.svg";
import blankUserIcon from "../../Assets/blank-profile-temp.png";
import degreeIcon from "../../Assets/degree-icon.svg";
import gpaIcon from "../../Assets/gpa-icon.svg";
import studyLoadIcon from "../../Assets/study-load-icon.svg";

function Profile() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [academics, setAcademics] = useState("");
	const [degree, setDegree] = useState("");
	const [gpa, setGpa] = useState("");
	const [studyLoad, setStudyLoad] = useState("");
	const [isDisabled, setIsDisabled] = useState("");
	const [resetForm, setResetForm] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const updatedUser = {
		name: username,
		email: email,
		degree: degree,
		academics: academics,
		gpa: gpa,
		studyLoad: studyLoad,
	};

	async function getUserInfo() {
		const user = await Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/userProfile",
		});
		return user.data.user;
	}

	function setUserInfo() {
		Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/userProfile",
		}).then((res) => {
			if (res.data.success) {
				setUsername(res.data.user.name);
				setEmail(res.data.user.email);
				setAcademics(res.data.user.academics);
				setDegree(res.data.user.degree);
				setGpa(res.data.user.gpa);
				setStudyLoad(res.data.user.studyLoad);
			} else {
				Swal.fire(
					"Oops! Something Broke",
					`${res.data.message}`,
					"error"
				);
			}
		});
	}

	useEffect(() => {
		setUserInfo();
		setIsDisabled(true);
	}, []);

	useEffect(() => {
		setUserInfo();
		setIsDisabled(true);
	}, [resetForm]);

	function handleRadioChange(e) {
		setStudyLoad(e.target.value);
		setIsDisabled("");
	}

	async function updatedFields() {
		const user = await getUserInfo();
		const updated = {};

		for (let key of Object.keys(user)) {
			if (user[key] !== updatedUser[key]) {
				updated[key] = updatedUser[key];
			}
		}

		return updated;
	}

	async function updateUserInfo(e) {
		e.preventDefault();

		const payload = await updatedFields();

		if (!payload) {
			return Swal.fire(
				"Whoops!",
				"You haven't updated anything",
				"error"
			);
		}

		Axios({
			method: "POST",
			data: payload,
			withCredentials: true,
			url: "http://localhost:5000/updateProfile",
		}).then((res) => {
			if (res.data.success) {
				Swal.fire(`${res.data.message}`, "", "success").then((swal) => {
					if (swal.isConfirmed || swal.isDismissed) {
						window.location.href = "/mainpage";
					}
				});
			} else {
				setErrorMsg(res.data.message);
			}
		});
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
								placeholder="Username"
								value={username || ""}
								onChange={(e) => {
									setUsername(e.target.value);
									setIsDisabled("");
								}}
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
								onChange={(e) => {
									setEmail(e.target.value);
									setIsDisabled("");
								}}
							/>
						</div>

						<div className="degree-div">
							<div className="degree-label">
								<img
									alt="Degree Icon"
									className="degree-icon"
									src={degreeIcon}
								/>
								<h3 className="profile-header">Degree</h3>
							</div>
							<input
								className="profile-input"
								placeholder="Degree"
								value={degree || ""}
								onChange={(e) => {
									setDegree(e.target.value);
									setIsDisabled("");
								}}
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
								placeholder="Subjects"
								type={"textarea"}
								value={academics || ""}
								onChange={(e) => {
									setAcademics(e.target.value);
									setIsDisabled("");
								}}
							></textarea>
						</div>

						<div className="profile-container">
							<div className="gpa-div">
								<div className="gpa-label">
									<img
										alt="GPA Icon"
										className="gpa-icon"
										src={gpaIcon}
									/>
									<h3 className="profile-header">GPA</h3>
								</div>
								<input
									className="profile-input"
									placeholder="GPA (out of 7)"
									value={gpa || ""}
									onChange={(e) => {
										setGpa(e.target.value);
										setIsDisabled("");
									}}
								/>
							</div>

							<div className="study-load-div">
								<div className="study-load-label">
									<img
										alt="Study Load Icon"
										className="study-load-icon"
										src={studyLoadIcon}
									/>
									<h3 className="profile-header">
										Study Load
									</h3>
								</div>

								<div className="study-load-buttons">
									<div className="full-time-div">
										<input
											className="study-load-input"
											type={"radio"}
											value="full-time"
											id="fulltime-input"
											checked={studyLoad === "full-time"}
											onChange={handleRadioChange}
										/>
										<label htmlFor="fulltime-input">
											Full-Time
										</label>
									</div>
									<div className="part-time-div">
										<input
											className="study-load-input"
											type={"radio"}
											value="part-time"
											id="parttime"
											checked={studyLoad === "part-time"}
											onChange={handleRadioChange}
										/>
										<label htmlFor="parttime-input">
											Part-Time
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="profile-buttons">
						<button
							type="button"
							className="cancel-button"
							onClick={() => {
								setResetForm(!resetForm);
								console.log(resetForm);
							}}
						>
							Cancel
						</button>
						<button
							disabled={isDisabled ? true : ""}
							type="submit"
							className="submit-button"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Profile;
