import "./MainPage.css";
import ReactDOMServer from "react-dom/server";
import Axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import rejectIcon from "../../Assets/reject-button-icon.svg";
import interestIcon from "../../Assets/interest-button-icon.svg";
import profileIcon from "../../Assets/profile-icon.svg";
import logoutIcon from "../../Assets/logout-icon.svg";
import twitterIcon from "../../Assets/twitterIcon.svg";
import instaIcon from "../../Assets/instaIcon.svg";
import facebookIcon from "../../Assets/facebookIcon.svg";

function MainPage() {
	const [userList, setUserList] = useState([]);

	const instaImg = ReactDOMServer.renderToString(
		<img alt="Instagram" class="instagram-swal" src={instaIcon} />
	);

	async function getUserList() {
		await Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/userList",
		}).then((res) => {
			if (res.data.success) {
				setUserList(res.data.userList);
			} else {
				Swal.fire(
					"Oops! Something Broke",
					`${res.data.message}`,
					"error"
				).then((swal) => {
					if (swal.isConfirmed || swal.isDismissed) {
						window.location.href = "/";
					}
				});
			}
		});
	}

	const retrieveNewUsers = async () => {
		await Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/updateUserList",
		}).then((res) => {
			if (res.data.success) {
				setUserList(res.data.userList);
			}
		});
	};

	function handleSocials(e, userType) {
		if (e.isConfirmed) {
			if (userType.instagram) {
				window.open(userType.instagram, "_blank").focus();
			}
		} else if (e.isDenied) {
			if (userType.facebook) {
				window.open(userType.facebook, "_blank").focus();
			}
		} else if (e.isDismissed) {
			if (userType.twitter) {
				window.open(userType.twitter, "_blank").focus();
			}
		}
	}

	// add logic which only performs the seekmatches every 4 records accepted or rejected
	const updateMatches = async (userDisplayed) => {
		await Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/updateMatches",
			data: { userDisplayed },
		});
	};

	const retrieveMatches = async () => {
		await Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/retrieveMatches",
		}).then(async (res) => {
			if (res.data.success) {
				for (const match of res.data.matches) {
					const matchedUserImg = ReactDOMServer.renderToString(
						<img
							alt="Student"
							className="student-photo-swal"
							src={match.user.avatar}
						/>
					);

					const matchedUserAcademics =
						match.user.academics?.length > 0 &&
						match.user.academics
							.map((academic) => {
								return (
									'<div className="student-academics">' +
									"<p>" +
									'<span className="academic-mark">' +
									`${academic.grade || "HD"} -` +
									`</span>` +
									`${academic.subject}` +
									"</p>" +
									"</div>"
								);
							})
							.join("");
					let userDisplayed = match.user.id;
					await Swal.fire({
						showDenyButton: true,
						showCancelButton: true,
						cancelButtonColor: "#FFFFFF",
						confirmButtonColor: "#FFFFFF",
						denyButtonColor: "#FFFFFF",
						confirmButtonText: `${instaImg}`,
						denyButtonText: `<img alt="Facebook" class="facebook-swal" src=${facebookIcon} />`,
						cancelButtonText: `<img alt="Twitter" class="twitter-swal" src=${twitterIcon} />`,
						html:
							`<b>Welcome back, you matched with</b><br>` +
							`<br/>` +
							`${matchedUserImg}` +
							`<br/>` +
							`<div class="student-title-swal">` +
							`<h3 class="student-name">${match.user.name}</h3> <h5 class="student-degree">${match.user.degree}</h5>` +
							`</div>` +
							`<p class="student-email-swal">${match.user.email}</p>` +
							`<div class="student-academics-swal">` +
							`${matchedUserAcademics || ""}` +
							`</div>`,
					}).then(async (result) => {
						if (result.isConfirmed) {
							handleSocials(result, match.user);
							await updateMatches(userDisplayed);
						} else if (result.isDenied) {
							handleSocials(result, match.user);
							await updateMatches(userDisplayed);
						} else if (result.isDismissed) {
							handleSocials(result, match.user);
							await updateMatches(userDisplayed);
						}
					});
				}
			} else {
				Swal.fire(
					"Oops! Something Broke",
					`${res.data.message}`,
					"error"
				).then((swal) => {
					if (swal.isConfirmed || swal.isDismissed) {
						window.location.href = "/";
					}
				});
			}
		});
	};

	useEffect(() => {
		async function getUser() {
			await getUserList();
			await retrieveNewUsers();
			await retrieveMatches();
		}
		getUser();
	}, []);

	async function handleRejection(user) {
		//Update user list with newly registered users
		const lastUser = Object.values(userList[0].user);
		if (lastUser.indexOf(user._id) > -1 || userList?.length === 0) {
			retrieveNewUsers();
		}

		//Rejects the user and filters the list
		await Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/declineUser",
			data: { user: user },
		}).then((res) => {
			if (res.data.success) {
				setUserList(res.data.userList);
			} else {
				Swal.fire(
					"Oops! Something Broke",
					`${res.data.message}`,
					"error"
				);
			}
		});
	}

	async function handleMatch(user) {
		// const filteredList = filterUserList(user);
		// setUserList(filteredList);

		const academics =
			user.academics?.length > 0 &&
			user.academics
				.map((academic) => {
					return (
						'<div className="student-academics">' +
						"<p>" +
						'<span className="academic-mark">' +
						`${academic.grade || "HD"} -` +
						`</span>` +
						`${academic.subject}` +
						"</p>" +
						"</div>"
					);
				})
				.join("");

		const userImg = ReactDOMServer.renderToString(
			<img
				alt="Student"
				className="student-photo-swal"
				src={user.avatar}
			/>
		);

		//Update user list with newly registered users
		const lastUser = Object.values(userList[0].user);
		if (lastUser.indexOf(user._id) > -1 || userList?.length === 0) {
			retrieveNewUsers();
		}

		retrieveMatches();

		// adds users to potential matches or confirmed matches
		await Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/acceptUser",
			data: { user: user },
		}).then((res) => {
			if (res.data.success) {
				setUserList(res.data.userList);
				if (res.data.isMatch) {
					Swal.fire({
						showDenyButton: true,
						showCancelButton: true,
						cancelButtonColor: "#FFFFFF",
						confirmButtonColor: "#FFFFFF",
						denyButtonColor: "#FFFFFF",
						confirmButtonText: `${instaImg}`,
						denyButtonText: `<img alt="Facebook" class="facebook-swal" src=${facebookIcon} />`,
						cancelButtonText: `<img alt="Twitter" class="twitter-swal" src=${twitterIcon} />`,
						html:
							`<b>You just matched with</b><br>` +
							`<br/>` +
							`${userImg}` +
							`<br/>` +
							`<div class="student-title-swal">` +
							`<h3 class="student-name">${user.name}</h3> <h5 class="student-degree">${user.degree}</h5>` +
							`</div>` +
							`<p class="student-email-swal">${user.email}</p>` +
							`<div class="student-academics-swal">` +
							`${academics || ""}` +
							`</div>`,
					}).then((result) => {
						if (result.isConfirmed) {
							handleSocials(result, user);
						} else if (result.isDenied) {
							handleSocials(result, user);
						} else if (result.isDismissed) {
							handleSocials(result, user);
						}
					});
				}
			} else {
				Swal.fire(
					"Oops! Something Broke",
					`${res.data.message}`,
					"error"
				);
			}
		});
	}

	const logout = () => {
		Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/logout",
		}).then(() =>
			Swal.fire("Successfully Logged Out", "", "success").then((swal) => {
				if (swal.isConfirmed || swal.isDismissed) {
					window.location.href = "/";
				}
			})
		);
	};

	return (
		<div className="main-div">
			<div className="nav-buttons">
				<Link
					to={"/profile"}
					state={{ from: window.location.pathname }}
					className="profile-icon"
				>
					<img alt="profileIcon" src={profileIcon}></img>
				</Link>

				<img
					alt="logoutIcon"
					src={logoutIcon}
					className="logout-icon"
					onClick={logout}
				></img>
			</div>
			<div className="main-card">
				{userList?.length === 0 && (
					<p className="empty-p">
						There's no one new in your class...
					</p>
				)}
				<div className="swipe">
					{userList?.length > 0 &&
						userList?.map((student, i) => (
							<div className="absolute-student-card" key={i}>
								<div className="main-student-photo">
									<img
										alt="Student"
										className="main-student-photo"
										src={student.user.avatar}
									/>
								</div>

								<div className="student-info">
									<div className="student-title">
										<h3 className="student-name">
											{student.user.name}
										</h3>
										<h5 className="student-degree">
											{student.user.degree}
										</h5>
									</div>

									{student.user.academics?.length > 0 &&
										student.user.academics.map(
											(academic, i) => (
												<div
													className="student-academics"
													key={i}
												>
													<p>
														<span className="academic-marks">
															{academic.grade ||
																"HD"}{" "}
															-{" "}
														</span>
														{academic.subject}
													</p>
												</div>
											)
										)}

									<div className="student-degree-details">
										<div className="student-gpa">
											<p>
												<span className="academic-marks">
													{student.user.gpa && "GPA"}{" "}
												</span>
												{student.user.gpa}
											</p>
										</div>

										<div className="student-study">
											<span className="academic-marks">
												{student.user.studyLoad &&
													"Studying"}
											</span>
											<p>{student.user.studyLoad}</p>
										</div>
									</div>
								</div>
								<div className="student-interest-buttons">
									<img
										alt="Reject"
										className="student-reject-image"
										src={rejectIcon}
										onClick={(e) =>
											handleRejection(student.user)
										}
									/>
									<img
										alt="Interest"
										className="student-interest-image"
										src={interestIcon}
										onClick={() =>
											handleMatch(student.user)
										}
									/>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default MainPage;
