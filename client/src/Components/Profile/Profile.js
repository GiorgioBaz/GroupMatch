import "./Profile.css";
import Axios from "axios";
import { useState } from "react";

function Profile() {

	const {data, setData} = useState(null);

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
			<button onClick={getUser}>Submit</button> 
			{data ? <h1>{data}</h1> : null}
		</div>
	);
}

export default Profile;
