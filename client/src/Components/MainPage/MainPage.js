import "./MainPage.css";
import { Link } from "react-router-dom";


function MainPage() {

	return (
		<div>
            <Link to="/profile"> 
							Profile
						</Link>             
		</div>
	);
}

export default MainPage;
