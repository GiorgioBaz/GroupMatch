import React, { Component } from 'react';
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../Assets/background.svg";


class Login extends Component {
    render() {
        return(
            <div style={{backgroundImage: `url(${background})`}}>
                <p>Hello World!</p>
            </div>

        );
    }
}

export default Login;