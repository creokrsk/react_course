import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commntDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
    },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commntDeleted,
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const deleteCommentRequested = createAction("comments/deleteCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => {
    return state.comments.entities;
};
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(addCommentRequested(payload));
    const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now(),
        userId: getCurrentUserId()(getState()),
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const deleteComment = (id) => async (dispatch) => {
    dispatch(deleteCommentRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commntDeleted(id));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export default commentsReducer;
