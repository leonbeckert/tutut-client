import {
    SET_TUTS,
    LIKE_TUT,
    UNLIKE_TUT,
    LOADING_DATA,
    DELETE_TUT,
    POST_TUT,
    SET_TUT,
} from "../types";

const initialState = {
    tuts: [],
    tut: {},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
        case SET_TUTS:
            return {
                ...state,
                tuts: action.payload,
                loading: false,
            };
        case SET_TUT:
            return {
                ...state,
                tut: action.payload,
                loading: false,
            };
        case LIKE_TUT:
        case UNLIKE_TUT:
            let unlikeIndex = state.tuts.findIndex(
                (tut) => tut.tutId === action.payload.tutId
            );
            state.tuts[unlikeIndex] = action.payload;
            if (state.tut.tutId === action.payload.tutId) {
                state.tut = action.payload;
            }
            return {
                ...state,
            };
        case DELETE_TUT:
            let deleteIndex = state.tuts.findIndex(
                (tut) => tut.tutId === action.payload
            );
            state.tuts.splice(deleteIndex, 1);
            return {
                ...state,
            };
        case POST_TUT:
            return {
                ...state,
                tuts: [action.payload, ...state.tuts],
            };
        default:
            return state;
    }
}
