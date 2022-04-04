import "./MainPage.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import rejectIcon from "../../Assets/reject-button-icon.svg";
import interestIcon from "../../Assets/interest-button-icon.svg";
import profileIcon from "../../Assets/profile-icon.svg";
import logoutIcon from "../../Assets/logout-icon.svg";

function MainPage() {
	const [userList, setUserList] = useState([]);

	async function getUserList() {
		let userList;
		await Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/userList",
		}).then((res) => {
			if (res.data.success) {
				userList = res.data.userList;
			} else {
				Swal.fire(
					"Oops! Something Broke",
					`${res.data.message}`,
					"error"
				);
			}
		});
		return userList;
	}

	useEffect(() => {
		async function getUser() {
			setUserList(await getUserList());
		}
		getUser();
	}, []);

	async function handleRejection(user) {
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
		await Axios({
			method: "POST",
			withCredentials: true,
			url: "http://localhost:5000/acceptUser",
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
			<div className="main-card">
				<div className="nav-buttons">
					<Link to="/profile" className="profile-icon">
						<img alt="profileIcon" src={profileIcon}></img>
					</Link>

					<img
						alt="logoutIcon"
						src={logoutIcon}
						className="logout-icon"
						onClick={logout}
					></img>
				</div>
				{userList?.length === 0 && (
					<p className="empty-p">
						There's no one new in your class...
					</p>
				)}
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
														{academic.grade || "HD"}{" "}
														-{" "}
													</span>
													{academic.subject}
												</p>
											</div>
										)
									)}

								<div className="student-degree-details">
									<div className="student-gpa">
										<p>{student.user.gpa}</p>
									</div>

									<div className="student-study">
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
									onClick={() => handleMatch(student.user)}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default MainPage;
