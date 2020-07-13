import React, { Component } from "react";
import Footer from "./footer";
import Nav from "./nav";
import Podcasts from "./podcasts";
import Playlist from "./playlist";

class Featured extends Component {
    render() {
        return (
            <div id="main">
                <div id="content" className="main animated fadein">
                    <Playlist />

                    <div className="animated fadeinup delay-1">
                        <Podcasts />
                        <div className="clr"></div>
                    </div>

                    <Footer />
                </div>

                <Nav />
            </div>
        );
    }
}

export default Featured;
