import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "./podcastActions";

class Podcasts extends Component {
    constructor(props) {
        console.log("Podcasts -> constructor -> props", props);
        super(props);
        // this.state = {};
    }
    selectPodcast(podcast, event) {
        console.log("Select Podcast: " + JSON.stringify(podcast));
        this.props.podcastSelected(podcast);
    }

    render() {
        let list = this.props.podcasts.all || [];

        // let list = "";
        // if (this.props.podcasts) {
        //     list = this.props.podcasts.all;
        // }

        return (
            <div>
                {list.map((podcast, i) => {
                    return (
                        <div
                            key={i}
                            className="shop-banner animated fadeinup delay-2"
                        >
                            <a
                                onClick={this.selectPodcast.bind(this, podcast)}
                                href="#"
                            >
                                <img src={podcast.artworkUrl600} alt="" />
                                <div className="opacity-overlay valign-wrapper">
                                    <div className="valign center width-100">
                                        <p className="white-text">
                                            {podcast.collectionName}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps -> state", state);
    return {
        podcasts: state.podcast,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        podcastSelected: (podcast) =>
            dispatch(actions.podcastSelected(podcast)),
    };
};

export default connect(mapStateToProps, dispatchToProps)(Podcasts);
