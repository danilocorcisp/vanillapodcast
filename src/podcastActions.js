import React from "react";
import axios from "./axios";
import constants from "./constants";

export default {
    searchPodcasts: (params) => {
        console.log("searchPodcasts: " + JSON.stringify(params));
    },

    podcastsReceived: (podcasts) => {
        return {
            type: constants.PODCASTS_RECEIVED,
            podcasts: podcasts,
        };
    },

    podcastSelected: (podcast) => {
        return {
            type: constants.PODCAST_SELECTED,
            podcast: podcast,
        };
    },

    // trackListReady: (list) => {
    //     return {
    //         type: constants.TRACKLIST_READY,
    //         list: list,
    //     };
    // },
};

export async function trackListReady(list) {
    console.log("trackListReady -> list", list);
    return {
        type: constants.TRACKLIST_READY,
        list: list,
    };
}
