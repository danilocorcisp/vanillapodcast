import React from "react";
import axios from "./axios";
import Logo from "./logo";
import { Link } from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        // console.log(e.target.value);
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
            .post("/register", this.state)
            .then((resp) => {
                console.log(resp);
                if (resp.data.success) {
                    console.log(
                        "Registration -> submit -> data.success",
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
            <>
                <div className="main animated fadein">
                    <div>
                        <Logo />
                    </div>
                    <div className="fullscreen bg-4 valign-wrapper animated fadeinright">
                        <div className="opacity-overlay"></div>
                        <div className="valign center-align w-100">
                            <h1 className="m-0 white-text">
                                <strong>
                                    REGISTER TO BE PART OF THIS PODCAST
                                    COMMUNITY
                                </strong>
                            </h1>
                            <h5 className="white-text">Fill the form</h5>
                            <div className="p-20">
                                <div className="input-field with-bg center">
                                    <input
                                        className="rounded validate"
                                        required
                                        name="first"
                                        type="text"
                                        placeholder="First name"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <input
                                        className="rounded validate"
                                        required
                                        name="last"
                                        type="text"
                                        placeholder="Last name"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <input
                                        className="rounded validate"
                                        required
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <input
                                        className="rounded validate"
                                        required
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <br></br>
                                <span className="focus-input"></span>
                                <div className="container-login-form-btn">
                                    <button
                                        className="login-form-btn"
                                        onClick={(e) => this.submit(e)}
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="flex-col-c">
                                    <p className="register">
                                        <Link to="/login">
                                            Have an account? Login here
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Registration;
