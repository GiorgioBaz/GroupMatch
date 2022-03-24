import "./MainPage.css";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import sampleStudent from "../../Assets/blank-profile-temp.png";
import rejectIcon from "../../Assets/reject-button-icon.svg";
import interestIcon from "../../Assets/interest-button-icon.svg";

function MainPage() {
	const { data, setData } = useState(null);

	async function getUserInfo() {
		const user = await Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/userProfile",
		});
		return user.data.user;
	}

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
						src={sampleStudent}
					/>
				</div>

				<div className="student-info">
					<div className="student-title">
						<h3 className="student-name">Student Name</h3>
						<h5 className="student-degree">Degree</h5>
					</div>

					<div className="student-academics">
						<p><span class="academic-marks"> HD/D/C/F - </span>Subject A</p>
						<p><span class="academic-marks"> HD/D/C/F - </span>Subject B</p>
						<p><span class="academic-marks"> HD/D/C/F - </span>Subject C</p>
					</div>

					<div className="student-degree-details">
						<div className="student-gpa">
							<p>GPA/7</p>
						</div>

						<div className="student-study">
							<p>Full/Part Time</p>
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
