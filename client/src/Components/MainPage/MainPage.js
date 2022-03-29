import "./MainPage.css";
import Axios from "axios";
import { useState, useEffect, } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import sampleStudent from "../../Assets/blank-profile-temp.png";
import rejectIcon from "../../Assets/reject-button-icon.svg";
import interestIcon from "../../Assets/interest-button-icon.svg";

function MainPage() {
	const [username, setUsername] = useState("");
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

	const { data, setData } = useState(null);

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
	}, []);

	return (
		<div className="main-div">
			<div>
				<Link to="/profile">Profile</Link>

				<button onClick={getUserInfo}>Submit</button>
				{data ? <h1>{data}</h1> : null}
			</div>

			<div className="main-card">
				<div className="main-student-photo">
					<img
						alt="Student"
						className="main-student-photo"
						src={avatar}
					/>
				</div>

				<div className="student-info">
					<div className="student-title">
						<h3 className="student-name">{username}</h3>
						<h5 className="student-degree">{degree}</h5>
					</div>

					<div className="student-academics">
						<p><span className="academic-marks">{grade1 || "HD"} - </span>{subject1}</p>
						<p><span className="academic-marks">{grade2 || "HD"} - </span>{subject2}</p>
						<p><span className="academic-marks">{grade3 || "HD"} - </span>{subject3}</p>
					</div>

					<div className="student-degree-details">
						<div className="student-gpa">
							<p>{gpa}</p>
						</div>

						<div className="student-study">
							<p>{studyLoad}</p>
						</div>
					</div>
				</div>

				<div className="student-interest-buttons">
					<img
						alt="Reject"
						className="student-reject-image"
						src={rejectIcon}
						onClick={() => console.log("Click")}
					/>
					<img
						alt="Interest"
						className="student-interest-image"
						src={interestIcon}
						onClick={() => console.log("Click")}
					/>
				</div>
			</div>
		</div>
	);
}

export default MainPage;
