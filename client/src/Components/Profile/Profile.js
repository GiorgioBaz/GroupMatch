import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./Profile.css";
import Grade from "./Grade/Grade";
import emailIcon from "../../Assets/email-icon.svg";
import userIcon from "../../Assets/user-icon.svg";
import academicsIcon from "../../Assets/academics-icon.svg";
import degreeIcon from "../../Assets/degree-icon.svg";
import gpaIcon from "../../Assets/gpa-icon.svg";
import studyLoadIcon from "../../Assets/study-load-icon.svg";
import twitterIcon from "../../Assets/twitterIcon.svg";
import facebookIcon from "../../Assets/facebookIcon.svg";
import instagramIcon from "../../Assets/instagramIcon.svg";
import homeIcon from "../../Assets/home-icon.svg";

function Profile() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [grade1, setGrade1] = useState("HD");
	const [subject1, setSubject1] = useState("");
	const [grade2, setGrade2] = useState("HD");
	const [subject2, setSubject2] = useState("");
	const [grade3, setGrade3] = useState("HD");
	const [subject3, setSubject3] = useState("");
	const [degree, setDegree] = useState("");
	const [gpa, setGpa] = useState("");
	const [studyLoad, setStudyLoad] = useState("");
	const [avatar, setAvatar] = useState("");
	const [isDisabled, setIsDisabled] = useState("");
	const [resetForm, setResetForm] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [fileInputState, setFileInputState] = useState("");
	const [previewSource, setPreviewSource] = useState("");
	const [selectedFile, setSelectedFile] = useState();
	const [facebook, setFacebook] = useState();
	const [twitter, setTwitter] = useState();
	const [instagram, setInstagram] = useState();

	const emailErr = errorMsg && errorMsg && (
		<p className="error-p">{errorMsg}</p>
	);
	// Creates an array of objects which we use to evaluate if the information has been changed so we can send the new info
	const academicFields = [
		{ grade: grade1, subject: subject1 },
		{ grade: grade2, subject: subject2 },
		{ grade: grade3, subject: subject3 },
	];

	const updatedUser = {
		name: username,
		email: email,
		degree: degree,
		academics: academicFields,
		gpa: gpa,
		studyLoad: studyLoad,
		avatar: previewSource,
		facebook: facebook,
		instagram: instagram,
		twitter: twitter,
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
				const academics = res.data.user.academics;
				setUsername(res.data.user.name);
				setEmail(res.data.user.email);
				setGrade1(academics[0]?.grade);
				setSubject1(academics[0]?.subject);
				setGrade2(academics[1]?.grade);
				setSubject2(academics[1]?.subject);
				setGrade3(academics[2]?.grade);
				setSubject3(academics[2]?.subject);
				setDegree(res.data.user.degree);
				setGpa(res.data.user.gpa);
				setStudyLoad(res.data.user.studyLoad);
				setAvatar(res.data.user.avatar);
				setFacebook(res.data.user.facebook);
				setInstagram(res.data.user.instagram);
				setTwitter(res.data.user.twitter);
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

	function handleGradeChange(e, i) {
		switch (i) {
			case 0:
				setGrade1(e.target.value);
				break;
			case 1:
				setGrade2(e.target.value);
				break;
			case 2:
				setGrade3(e.target.value);
				break;
		}
		setIsDisabled("");
	}

	function handleSubjectChange(e, i) {
		switch (i) {
			case 0:
				setSubject1(e.target.value);
				break;
			case 1:
				setSubject2(e.target.value);
				break;
			case 2:
				setSubject3(e.target.value);
				break;
		}
		setIsDisabled("");
	}

	async function updatedFields() {
		const user = await getUserInfo();
		const updated = {};

		if (!user)
			return Swal.fire(
				"Oops! Something Broke",
				`Please Log In To Your Account Again`,
				"error"
			);

		for (let key of Object.keys(user)) {
			if (
				user[key] !== updatedUser[key] &&
				key !== "academics" &&
				key !== "avatar" &&
				key !== "cloudinary_id"
			) {
				updated[key] = updatedUser[key];
			} else if (key === "academics") {
				const updatedAcademics = updatedUser[key].find(
					(el, i) =>
						el.grade !== user[key][i]?.grade ||
						el.subject !== user[key][i]?.subject
				);

				if (updatedAcademics) {
					updated[key] = updatedUser[key];
				}
			}
		}
		return updated;
	}

	const updateUserInfo = async (e) => {
		e.preventDefault();
		const payload = await updatedFields();

		if (Object.keys(payload).length === 0) {
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
				handleSubmitFile();
				Swal.fire(`${res.data.message}`, "", "success").then((swal) => {
					if (swal.isConfirmed || swal.isDismissed) {
						window.location.reload(true);
					}
				});
			} else {
				setErrorMsg(res.data.message);
			}
		});
	};

	const inputRef = useRef();

	const handleUpload = () => {
		inputRef.current.click();
	};

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setSelectedFile(file);
		setFileInputState(e.target.value);
		setIsDisabled("");
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	function handleSubmitFile() {
		if (!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = () => {
			uploadImage(reader.result);
		};
	}

	const uploadImage = async (base64EncodedImage) => {
		try {
			await fetch("/api/upload", {
				method: "POST",
				body: JSON.stringify({ data: base64EncodedImage }),
				headers: { "Content-Type": "application/json" },
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Link className="home-icon" to="/mainpage">
				<img alt="mainpageIcon" src={homeIcon}></img>
			</Link>

			<div className="profile-div">
				<input
					type="file"
					ref={inputRef}
					id="fileInput"
					name="image"
					onChange={handleFileInputChange}
					value={fileInputState}
					className="form-input"
				/>
				<div className="profile-card">
					<h2 className="student-header">{username}</h2>
					<form className="profile-form" onSubmit={updateUserInfo}>
						<img
							onClick={handleUpload}
							alt="Student Profile"
							className="student-photo"
							src={previewSource ? previewSource : avatar}
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
									required
								/>
								{emailErr}
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
									required
								/>
							</div>

							<div className="academics-div">
								<div className="academics-label">
									<img
										alt="Academics Icon"
										className="academics-icon"
										src={academicsIcon}
									/>
									<h3 className="profile-header">
										Academics
									</h3>
								</div>
								<div className="academics-label2">
									<h4 className="academics-grade">Grade</h4>
									<h4 className="academics-subject">
										Subject
									</h4>
								</div>
								<Grade
									index={0}
									grade={grade1}
									subject={subject1}
									onGradeChange={handleGradeChange}
									onSubjectChange={handleSubjectChange}
								/>
								<Grade
									index={1}
									grade={grade2}
									subject={subject2}
									onGradeChange={handleGradeChange}
									onSubjectChange={handleSubjectChange}
								/>
								<Grade
									index={2}
									grade={grade3}
									subject={subject3}
									onGradeChange={handleGradeChange}
									onSubjectChange={handleSubjectChange}
								/>
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
										placeholder="GPA / 7"
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
												checked={
													studyLoad === "full-time"
												}
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
												checked={
													studyLoad === "part-time"
												}
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

						<span className="span-div">
							<hr />
						</span>
						<p className="disclaimer">
							Disclaimer: At least one social is needed to connect
							with other students.
						</p>
						<div className="profile-form-inputs">
							<div className="facebook-div">
								<div className="facebook-label">
									<img
										alt="User Icon"
										className="facebook-icon"
										src={facebookIcon}
									/>
									<h3 className="profile-header">Facebook</h3>
								</div>
								<input
									className="profile-input"
									placeholder="Facebook Account URL"
									value={facebook || ""}
									onChange={(e) => {
										setFacebook(e.target.value);
										setIsDisabled("");
									}}
									required
								></input>
							</div>

							<div className="instagram-div">
								<div className="instagram-label">
									<img
										alt="instagram Icon"
										className="instagram-icon"
										src={instagramIcon}
									/>
									<h3 className="profile-header">
										Instagram
									</h3>
								</div>
								<input
									className="profile-input"
									placeholder="Instagram Account URL"
									name="instagram"
									value={instagram || ""}
									onChange={(e) => {
										setInstagram(e.target.value);
										setIsDisabled("");
									}}
								/>
							</div>

							<div className="twitter-div">
								<div className="twitter-label">
									<img
										alt="Twitter Icon"
										className="twitter-icon"
										src={twitterIcon}
									/>
									<h3 className="profile-header">Twitter</h3>
								</div>
								<input
									className="profile-input"
									placeholder="Twitter Account URL"
									value={twitter || ""}
									onChange={(e) => {
										setTwitter(e.target.value);
										setIsDisabled("");
									}}
								/>
							</div>
						</div>
						<div className="profile-buttons">
							<button
								type="button"
								className="cancel-button"
								onClick={() => {
									setResetForm(!resetForm);
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
		</>
	);
}

export default Profile;
