import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        console.log("Login -> constructor -> props", props);
        super(props);
        this.state = {};
    }

    handleChange(e) {
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log(this.state)
        );
    }

    submit(e) {
        e.preventDefault();
        axios
            .post("/login", this.state)
            .then((resp) => {
                console.log("Login -> submit -> data", resp);

                if (resp.data.success) {
                    console.log(
                        "Login -> submit -> data.success",
                        resp.data.success
                    );
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div className="main animated fadein">
                <div className="fullscreen bg-4 valign-wrapper animated fadeinright">
                    <div className="opacity-overlay"></div>
                    <div className="valign center-align w-100">
                        <h1 className="m-0 white-text">
                            <strong>OVRCast</strong>
                        </h1>
                        <h5 className="white-text">Login</h5>
                        <div className="p-20">
                            <div className="input-field with-bg center">
                                <input
                                    className="rounded validate"
                                    id="login"
                                    required
                                    name="email"
                                    type="email"
                                    onChange={(e) => this.handleChange(e)}
                                ></input>
                                <label htmlFor="login">Email</label>
                            </div>
                            <div className="input-field with-bg center">
                                <input
                                    className="rounded validate"
                                    id="login-psw"
                                    required
                                    name="password"
                                    type="password"
                                    onChange={(e) => this.handleChange(e)}
                                ></input>
                                <label htmlFor="login-psw">Password</label>
                            </div>
                            <br></br>
                            <span className="focus-input"></span>
                            <div className="container-login-form-btn">
                                <button
                                    className="login-form-btn"
                                    onClick={(e) => this.submit(e)}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="flex-col-c">
                                <p>
                                    <Link to="/reset">
                                        Change your password
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
