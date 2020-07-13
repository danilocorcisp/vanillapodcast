import React from "react";

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                {/* <h1 className="title">Welcome to Timão Network!</h1> */}
                <img className="logo" src="/img/logo.png" alt="OVRCast" />
            </>
        );
    }
}

export default Logo;

//fim
