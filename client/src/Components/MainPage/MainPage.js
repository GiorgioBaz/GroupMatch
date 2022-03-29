import "./MainPage.css";
import profileIcon from "../../Assets/profile-icon.svg";
import { Link } from "react-router-dom";

function MainPage() {
	return (
		<div>
			<Link className="profile-icon" to="/profile">
				<img alt="profileIcon" src={profileIcon}></img>
			</Link>
		</div>
	);
}

export default MainPage;
