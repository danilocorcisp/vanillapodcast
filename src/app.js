import React from "react";
import Nav from "./nav";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import Featured from "./Featured";
import Footer from "./footer";
import { BrowserRouter, Route } from "react-router-dom";
// import Find from "./find";

// import Friends from "./friendship";
// import Chat from "./chat";

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
                <div className="hero-header profile">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                uploaderIsVisible={this.state.uploaderIsVisible}
                                toggleModal={() => this.toggleModal()}
                                updatePic={(image) => this.updatePic(image)}
                            />
                        )}
                    />

                    <Route path="/featured" render={() => <Featured />} />

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updatePic={(image) => this.updatePic(image)}
                            toggleModal={() => this.toggleModal()}
                            image={this.state.image}
                        />
                    )}
                </div>
                <footer>
                    <Footer />
                    <Nav />
                </footer>
            </BrowserRouter>
        );
    }
}

//fim
