import "./MainPage.css";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import sampleStudent from "../../Assets/blank-profile-temp.png";
import rejectIcon from "../../Assets/reject-button-icon.svg";
import interestIcon from "../../Assets/interest-button-icon.svg";

function MainPage() {
	const { data, setData } = useState(null);

	const getUser = () => {
		Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:5000/currentUser",
		}).then((res) => {
			console.log(res.data);
		});
	};

	return (
		<div className="main-div">
			<div>
				<Link to="/profile">Profile</Link>

				<button onClick={getUser}>Submit</button>
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
						<p>Subject A</p>
						<p>Subject B</p>
						<p>Subject C</p>
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
					<button className="student-reject-button">
						<img
							alt="Reject"
							className="student-reject-image"
							src={rejectIcon}
						/>
					</button>

					<button className="student-interest-button">
						<img
							alt="Interest"
							className="student-interest-image"
							src={interestIcon}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default MainPage;
