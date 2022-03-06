import "./MainPage.css";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

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
		<div>
			<Link to="/">Login</Link>
			<Link to="/profile">Profile</Link>

			<button onClick={getUser}>Submit</button>
			{data ? <h1>{data}</h1> : null}
		</div>
	);
}

export default MainPage;
