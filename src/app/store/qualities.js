import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        // console.log(lastFetch);
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.FetchAll();
            dispatch(qualitiesReceived(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;

export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export const getQualitiesByIds = (qualitiesIds) => (state) => {
    // console.log(state.qualities.entities);
    if (state.qualities.entities) {
        const qualitiesArray = [];
        // console.log(qualitiesIds);
        if (qualitiesIds) {
            for (const qualId of qualitiesIds) {
                for (const quality of state.qualities.entities) {
                    // console.log(quality);
                    if (quality._id === qualId) {
                        qualitiesArray.push(quality);
                        break;
                    }
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};

export default qualitiesReducer;
