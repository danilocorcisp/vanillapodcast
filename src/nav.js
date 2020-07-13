import React, { Component } from "react";

export default (props) => {
    return (
        <div>
            <div className="menu-trigger z-depth-2">
                <div id="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <nav id="menu" className="menu">
                <div className="menu-navigation">
                    <ul className="full-menu collapsible">
                        <li>
                            <a href="/" className="no-child">
                                My profile
                            </a>
                        </li>
                        <li>
                            <a href="/featured" className="no-child">
                                Search
                            </a>
                        </li>
                        <li>
                            <a href="/logout" className="no-child">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
