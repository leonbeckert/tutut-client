import {
    SET_TUTS,
    LOADING_DATA,
    LIKE_TUT,
    UNLIKE_TUT,
    DELETE_TUT,
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

// Delete a tut
export const deleteTut = (tutId) => (dispatch) => {
    axios
        .delete(`/tut/${tutId}`)
        .then(() => {
            dispatch({ type: DELETE_TUT, payload: tutId });
        })
        .catch((err) => console.log(err));
};
