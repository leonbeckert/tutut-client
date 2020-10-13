import {
    SET_TUTS,
    LOADING_DATA,
    LIKE_TUT,
    UNLIKE_TUT,
    DELETE_TUT,
    SET_ERRORS,
    CLEAR_ERRORS,
    POST_TUT,
    LOADING_UI,
    SET_TUT,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get all tuts
export const getTuts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get("/tuts")
        .then((res) => {
            dispatch({
                type: SET_TUTS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_TUTS,
                payload: [],
            });
        });
};

// Get Tut Details
export const getTut = (tutId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/tut/${tutId}`)
        .then((res) => {
            dispatch({
                type: SET_TUT,
                payload: res.data,
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};

// Post a tut
export const postTut = (newTut) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/tut", newTut)
        .then((res) => {
            dispatch({
                type: POST_TUT,
                payload: res.data,
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

// Like a tut
export const likeTut = (tutId) => (dispatch) => {
    axios
        .get(`/tut/${tutId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_TUT,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

// Unlike a tut
export const unlikeTut = (tutId) => (dispatch) => {
    axios
        .get(`/tut/${tutId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_TUT,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

// Submit a comment
export const submitComment = (tutId, commentData) => (dispatch) => {
    console.log("dataActions submitComment");
    axios
        .post(`/tut/${tutId}/comment`, commentData)
        .then((res) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data,
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

// Delete a tut
export const deleteTut = (tutId) => (dispatch) => {
    axios
        .delete(`/tut/${tutId}`)
        .then(() => {
            dispatch({ type: DELETE_TUT, payload: tutId });
        })
        .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
