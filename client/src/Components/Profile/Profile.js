import "./Profile.css";
import emailIcon from "../../Assets/email-icon.svg";
import userIcon from "../../Assets/user-icon.svg";
import academicsIcon from "../../Assets/academics-icon.svg";
import blankUserIcon from "../../Assets/blank-profile-temp.png";

function Profile() {
	return (
		<div className="profile-div">
			<div className="profile-card">
				<h2 className="student-header">Student Name</h2>
				<form className="profile-form">
					<img
						alt="Student Profile"
						className="student-photo"
						src={blankUserIcon}
					/>

					<div className="username-div">
						<div className="username-label">
							<img
								alt="User Icon"
								className="username-icon"
								src={userIcon}
							/>
							<h4 className="profile-header">Username</h4>
						</div>
						<input
							className="profile-field"
							placeholder="Username Here"
						></input>
					</div>

					<div className="email-div">
						<div className="student-email-label">
							<img
								alt="Email Icon"
								className="student-email-icon"
								src={emailIcon}
							/>
							<h4 className="profile-header">Email</h4>
						</div>
						<input
							className="profile-field"
							placeholder="Email Here"
						></input>
					</div>

					<div className="academics-div">
						<div className="academics-label">
							<img
								alt="Academics Icon"
								className="academics-icon"
								src={academicsIcon}
							/>
							<h4 className="profile-header">Academics</h4>
						</div>
						<input
							className="profile-field"
							placeholder="Subjects Here"
						></input>
					</div>

					<div className="profile-buttons">
						<button className="cancel-button">Cancel</button>
						<button className="changes-button">Save Changes</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Profile;
