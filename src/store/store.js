// store.js

import { createStore } from 'vuex'
import MainVision from "../views/MainVision/MainVision.js";

const state = {
    // Your global state variables go here
    mainvision: MainVision,
    inThreeDMode: false
};

const mutations = {
    // Mutation functions to update the state go here
    setMainvision(state, mainvision) {
        state.mainvision = mainvision
    },
    enterThreeDMode(state) {
        state.inThreeDMode = true
    },
    exitThreeDMode(state) {
        state.inThreeDMode = false
    }
};

const actions = {
    // Action functions to perform asynchronous tasks go here (if needed)
};

const getters = {
    // Getters to access state properties with additional logic go here (if needed)
};

export default createStore({
    state,
    mutations,
    actions,
    getters,
});
