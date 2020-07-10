import React from "react";
import Logo from "./logo";
import Navbar from "./navbar";
import axios from "./axios";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";
import Find from "./find";
import Darkmode from "darkmode-js";
import Friends from "./friendship";
import Chat from "./chat";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
    }
    componentDidMount() {
        console.log("App mounted!");

        axios.get("/user").then(({ data }) => {
            // console.log("App -> componentDidMount -> data", data);
            this.setState({
                first: data.first,
                last: data.last,
                image: data.image,
                bio: data.bio,
            });

            // console.log("this.state: ", this.state);
        });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updatePic(image) {
        console.log("updatePic -> image", image);

        this.setState({
            image: image,
            uploaderIsVisible: false,
        });
    }

    showBio(bio) {
        console.log("showBio -> bio", bio);
        this.setState({
            bio: bio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <Logo />
                        <div>
                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                toggleModal={() => this.toggleModal()}
                            />
                        </div>
                    </div>

                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    image={this.state.image}
                                    bio={this.state.bio}
                                    uploaderIsVisible={
                                        this.state.uploaderIsVisible
                                    }
                                    toggleModal={() => this.toggleModal()}
                                    updatePic={(image) => this.updatePic(image)}
                                    showBio={(bio) => this.showBio(bio)}
                                />
                            )}
                        />

                        <Route
                            path="/podcast/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />

                        <Route path="/hottest" render={() => <Hottest />} />

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updatePic={(image) => this.updatePic(image)}
                                toggleModal={() => this.toggleModal()}
                                image={this.state.image}
                            />
                        )}
                    </div>
                    <footer></footer>
                </div>
            </BrowserRouter>
        );
    }
}

//fim
